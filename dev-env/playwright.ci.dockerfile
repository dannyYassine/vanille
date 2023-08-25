FROM mcr.microsoft.com/playwright:v1.31.0-focal

WORKDIR /usr/src/client

COPY ./client/package.json ./
COPY ./client/yarn.lock ./

RUN yarn

COPY ./client .