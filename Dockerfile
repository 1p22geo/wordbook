FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
RUN yarn set version stable
WORKDIR /app

COPY package.json yarn.lock .yarn ./
RUN  yarn install --immutable

# --------------------

FROM node:18-alpine AS builder
RUN yarn set version stable
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

# --------------------



FROM node:18-alpine AS runner
RUN yarn set version stable
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY . .
COPY --from=builder /app/.next ./.next
RUN  yarn workspaces focus --production --all
RUN mkdir /app/uploads
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["yarn", "start"]
