FROM node:18-alpine
WORKDIR /app
COPY . .
CMD [ "/bin/sh", "./startup.sh" ]
EXPOSE 3000