FROM alpine:latest

RUN apk add nginx nginx-mod-http-brotli

COPY docker/nginx.conf /etc/nginx/http.d/default.conf

WORKDIR /usr/share/nginx/html

COPY dist/ .

RUN ls -la .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
