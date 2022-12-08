FROM node:18-alpine
RUN apk update && apk upgrade
RUN apk add --no-cache sqlite

WORKDIR /app
COPY package*.json .

RUN npm install
COPY . .
EXPOSE 8080
CMD npm run dev