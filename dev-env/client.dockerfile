FROM node:16

WORKDIR /usr/src/client

# install packages
RUN apt-get update
RUN apt-get install -y git

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn

COPY ./ .