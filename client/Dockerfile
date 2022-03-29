FROM  node:12-alpine as build

LABEL  description="Client"

WORKDIR  /usr/src/app

COPY  package.json package-lock.json ./
RUN  npm install

COPY  . .

RUN npm run build

FROM nginx:1.16.0-alpine

COPY --from=build /usr/src/app/dist/ /usr/share/nginx/html/
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/default.conf /etc/nginx/conf.d/

EXPOSE $CLIENT_PORT
CMD ["nginx", "-g", "daemon off;"]
