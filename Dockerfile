FROM node:18-alpine
WORKDIR /app
COPY . .
CMD [ "bash", "./startup.sh" ]
EXPOSE 3000