FROM node:18-alpine
WORKDIR /app
COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
RUN yarn install
COPY . .
RUN yarn build
CMD [ "yarn", "start" ]
EXPOSE 3000