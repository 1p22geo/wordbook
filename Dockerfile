FROM node:18-alpine
WORKDIR /app
COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
RUN yarn install --frozen-lockfile --prod
COPY . .
CMD [ "yarn", "start" ]
EXPOSE 3000