FROM node:18-alpine AS prod_deps
RUN apk add --no-cache libc6-compat
RUN yarn set version stable
WORKDIR /app

COPY package.json yarn.lock .yarn ./
RUN  yarn workspaces focus --production --all

# --------------------
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
RUN yarn set version stable
WORKDIR /app

COPY package.json yarn.lock .yarn ./
COPY --from=prod_deps /app/node_modules ./
RUN  yarn

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
RUN rm -rf node_modules
COPY --from=builder /app/.next ./.next
COPY --from=prod_deps /app/node_modules ./node_modules
COPY --from=prod_deps /app/package.json ./package.json
RUN mkdir /app/uploads
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["yarn", "start"]
