FROM nginx:stable-alpine

ARG ENVIRONMENT=development

ENV IS_CONTAINER_ENV true

COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

COPY build/ .
RUN ls -la .

EXPOSE 80
