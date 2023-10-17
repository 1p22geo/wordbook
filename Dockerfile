FROM node:18-alpine
WORKDIR /app
COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
RUN yarn install --frozen-lockfile
RUN yarn build
CMD [ "/bin/sh", "./startup.sh" ]
EXPOSE 3000