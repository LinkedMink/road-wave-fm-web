FROM node:14-alpine

ARG ENVIRONMENT=development

ENV NODE_ENV ENVIRONMENT
ENV IS_CONTAINER_ENV true

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN apk update
RUN apk add curl python --no-cache --virtual build-dependencies build-base gcc

RUN yarn install --frozen-lockfile --production=true

COPY . .

EXPOSE 80

CMD [ "npm", "run", "start:serve" ]
