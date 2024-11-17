FROM dannyyassine/vanille-playwright:cd52517dd4583a9fcae0fe095218f13b0a7822cf

WORKDIR /usr/src/client

COPY ./package.json ./
COPY ./yarn.lock ./

COPY . .