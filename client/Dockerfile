FROM  node:12-alpine

LABEL  description="Client"

WORKDIR  /usr/src/app

COPY  package.json package-lock.json ./
RUN  npm install

#COPY  . .

EXPOSE  3000

#ENTRYPOINT  [ "npm" ]
#CMD  [ "start" ]

ENTRYPOINT  [ "npm" ]
CMD  [ "run", "dev" ]
