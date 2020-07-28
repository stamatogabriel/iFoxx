FROM node:alpine

WORKDIR /usr/app

COPY package.json ./

RUN yarn

COPY . .

EXPOSE 7000

CMD ["yarn", "start"]
