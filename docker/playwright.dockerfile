FROM mcr.microsoft.com/playwright:v1.31.0-focal

WORKDIR /usr/src/client

COPY ./package.json ./
COPY ./yarn.lock ./

COPY . .