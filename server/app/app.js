const Server = require('./server');

const server = new Server(process.env.SERVER_PORT);

console.log(process.env.SERVER_PORT)

server.listen(() => console.log(`Server is listening on ${process.env.SERVER_PORT} port`));


