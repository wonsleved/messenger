const Server = require('./server');

const server = new Server(process.env.PORT);

server.listen(() => console.log('Server is listening'));


