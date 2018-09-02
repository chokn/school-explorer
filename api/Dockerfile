FROM node:10-alpine
WORKDIR /usr/src/api
RUN apk update && apk add python g++ make && rm -rf /var/cache/apk/*
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 4000
CMD ["npm", "start"]

