FROM node:lts-alpine AS builder

ARG VERSION_URL
ARG VERSION_LABEL

ENV PUBLIC_VERSION_URL=${VERSION_URL}
ENV PUBLIC_VERSION_LABEL=${VERSION_LABEL}
ENV PUBLIC_ENABLE_DEV_POSTS=true

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY . .

RUN yarn run astro check
RUN yarn run build

FROM nginx:alpine-slim

RUN sed -i.bak -r 's/(\s+)#tcp_nopush(.*)$/\1tcp_nopush     on;/' /etc/nginx/nginx.conf
RUN sed -i.bak -r 's/(\s+)#gzip(.*)$/\1gzip     on;/' /etc/nginx/nginx.conf
RUN sed -i.bak -r 's/(\s+)#error_page\s+404(.*)$/\1error_page 404 \/404.html;/' /etc/nginx/conf.d/default.conf

COPY --from=builder /usr/src/app/public /usr/share/nginx/html
