FROM node:9 AS app_build

WORKDIR /usr/src/app/

COPY . /usr/src/app

RUN npm install

RUN npm run build

FROM nginx:1
COPY --from=app_build /usr/src/app/config/nginx.conf /etc/nginx/nginx.conf
COPY --from=app_build /usr/src/app/dist/ /usr/share/nginx/html

EXPOSE 80 443

CMD ["nginx"]