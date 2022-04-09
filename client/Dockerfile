FROM  node:12-alpine

LABEL  description="Client"

WORKDIR  /usr/src/app

COPY  package.json package-lock.json ./
RUN  npm install

#COPY  . .

EXPOSE  $CLIENT_PORT

#ENTRYPOINT  [ "npm" ]
#CMD  [ "start" ]

ENTRYPOINT  [ "npm" ]
CMD  [ "run", "dev", "$CLIENT_PORT" ]
