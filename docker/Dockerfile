FROM node:20-alpine as build

ARG TARGET_ENV=production

USER node
WORKDIR /home/node/build

RUN --mount=type=cache,target=/home/node/.npm/,uid=1000,gid=1000 \
    --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    npm ci --loglevel info

COPY ./ ./

RUN NODE_OPTIONS="--import tsx" npx webpack --config config/webpack.prod.ts

FROM alpine:latest

RUN --mount=type=cache,target=/var/cache/apk/ \
    apk add nginx nginx-mod-http-brotli

WORKDIR /usr/share/nginx/html

COPY docker/nginx.conf /etc/nginx/http.d/default.conf
COPY --from=build /home/node/build/dist/ ./

EXPOSE 80/tcp 443/tcp

CMD ["nginx", "-g", "daemon off;"]
