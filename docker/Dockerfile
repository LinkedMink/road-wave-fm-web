FROM nginx:stable-alpine

ARG ENVIRONMENT=development

ENV IS_CONTAINER_ENV true

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

COPY dist/ .

RUN ls -la .

EXPOSE 80
