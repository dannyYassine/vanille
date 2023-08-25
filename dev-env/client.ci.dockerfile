FROM node:16

WORKDIR /usr/src/client

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn

COPY ./ .