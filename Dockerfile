### Setup Dev Environment
FROM node:22-alpine AS dependencies

USER node:node
WORKDIR /home/node/app

RUN --mount=type=cache,id=npm,target=/home/node/.npm/,uid=1000,gid=1000 \
    --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    npm ci --loglevel info

COPY .browserslistrc tsconfig.json ./
COPY config/webpack* ./config/
COPY src ./src/

### Image for Dev Container
FROM dependencies AS watch

EXPOSE 8080/tcp
HEALTHCHECK CMD netstat -an | grep 8080 > /dev/null; if [ 0 != $? ]; then exit 1; fi;

ENV NODE_OPTIONS="--import tsx" TARGET_ENV=local-dev

CMD [ "npx", "webpack", "serve", "--config", "config/webpack.serve.ts" ]

### Build for Deployment
FROM dependencies AS build

ARG TARGET_ENV=production

RUN NODE_OPTIONS="--import tsx" npx webpack --config config/webpack.prod.ts

### Image for Deployment
FROM alpine:latest AS application

RUN --mount=type=cache,target=/var/cache/apk/ \
    apk add nginx nginx-mod-http-brotli

WORKDIR /usr/share/nginx/html

COPY config/nginx.conf /etc/nginx/http.d/default.conf
COPY --from=build /home/node/app/dist/ ./

EXPOSE 80/tcp 443/tcp
HEALTHCHECK CMD netstat -an | grep 443 > /dev/null; if [ 0 != $? ]; then exit 1; fi;

CMD ["nginx", "-g", "daemon off;"]
