echo "Initializing web messenger"

mkdir postgresdata

POSTGRES_USER=\"postgres\"
POSTGRES_PASSWORD=\"postgres\"
POSTGRES_DB=\"messenger\"
DB_HOST=\"postgres\"

touch .env && \
echo 'POSTGRES_USER='${POSTGRES_USER} > .env && \
echo 'POSTGRES_PASSWORD='${POSTGRES_PASSWORD} >> .env && \
echo 'POSTGRES_DB='${POSTGRES_DB} >> .env && \
echo 'CLIENT_PORT=3000' >> .env && \
echo 'SERVER_PORT=5000' >> .env && \
echo 'HOST_NAME="nginx"' >> .env

touch server/.env && \
echo 'DB_HOST='${DB_HOST} >> server/.env && \
echo 'DB_USER='${POSTGRES_USER} >> server/.env && \
echo 'DB_TIMEOUT=30000' >> server/.env && \
echo 'DB_PORT=5432' >> server/.env && \
echo 'DB_NAME='${POSTGRES_DB} >> server/.env && \
echo 'DB_PASS='${POSTGRES_PASSWORD} >> server/.env && \
echo 'BCRYPT_SALT=3' >> server/.env && \
echo 'JWT_ACCESS_SECRET=jwtaccesssecret' >> server/.env && \
echo 'JWT_REFRESH_SECRET=jwtrefreshsecret' >> server/.env

pushd server && npm install && \
popd && \
pushd client && npm install && \
lessc src/styles/index.less src/styles/index.css






