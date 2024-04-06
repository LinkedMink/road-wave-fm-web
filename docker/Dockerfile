FROM alpine:latest

RUN apk add nginx nginx-mod-http-brotli

WORKDIR /usr/share/nginx/html

COPY docker/nginx.conf /etc/nginx/http.d/default.conf
COPY dist/ .

EXPOSE 80/tcp
EXPOSE 443/tcp

CMD ["nginx", "-g", "daemon off;"]
