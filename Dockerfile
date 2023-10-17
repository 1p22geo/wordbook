FROM node:18-alpine
WORKDIR /app
COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build
RUN rm -rf ./node_modules
RUN yarn install --prod
CMD [ "yarn", "start" ]
EXPOSE 3000