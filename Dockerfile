FROM node:18-alpine
WORKDIR /app
COPY . .
CMD [ "/bin/bash", "./startup.sh" ]
EXPOSE 3000