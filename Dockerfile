### Setup Dev Environment
FROM docker.io/node:24-alpine AS dependencies

USER node
WORKDIR /home/node/app

RUN --mount=type=cache,id=npm,target=/home/node/.npm/,uid=1000,gid=1000 \
    --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=from=homedir,source=.npmrc,target=.npmrc \
    npm ci --loglevel info --cache /home/node/.npm

COPY .browserslistrc tsconfig.json ./
COPY config/webpack* ./config/
COPY src ./src/

### Image for Dev Container
FROM dependencies AS dev

EXPOSE 8080/tcp
HEALTHCHECK --interval=1m --timeout=3s --retries=2 --start-period=30s --start-interval=3s \
    CMD netstat -t -l -n | grep 8080

ENV NODE_OPTIONS="--import tsx" TARGET_ENV=local

CMD [ "npx", "webpack", "serve", "--config", "config/webpack.serve.ts" ]

### Build for Deployment
FROM dependencies AS build

ARG TARGET_ENV=production

RUN NODE_OPTIONS="--import tsx" npx webpack --config config/webpack.prod.ts

### Image for Deployment
FROM docker.io/linkedmink/nginx-proxy AS application

COPY --from=build /home/node/app/dist/ ./
