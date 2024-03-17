FROM nginx:1.25.4-alpine3.18
RUN rm -rf /usr/share/nginx/html/*
COPY html /usr/share/nginx/html
COPY cert /cert
COPY nginx.conf /etc/nginx/conf.d/default.conf
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
EXPOSE 80 443
