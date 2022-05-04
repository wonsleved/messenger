FROM  node:12-alpine

LABEL  description="Client"

WORKDIR  /usr/src/app

COPY  app/package.json app/package-lock.json ./
RUN npm install
RUN npm install -g less

EXPOSE  $CLIENT_PORT

ENTRYPOINT  [ "npm" ]
CMD  [ "run", "start" ]
