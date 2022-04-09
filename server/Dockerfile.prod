FROM  node:12-alpine

LABEL  description="Server"

WORKDIR  /usr/src

COPY  package.json package-lock.json ./
RUN  npm install

COPY  app app

ENTRYPOINT  [ "npm" ]
CMD  [ "start" ]

#ENTRYPOINT  [ "npm" ]
#CMD  [ "run", "dev" ]
