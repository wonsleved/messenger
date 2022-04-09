const websocketInitialization = require("./web-sockets/initialization");

const express = require('express');
const cookieParser = require('cookie-parser');
const apiRouter = require('./routes/api.route');
const errorMiddleware = require('./middlerwares/error.middleware');
const corsConfigMiddleware = require('./middlerwares/cors-config.middleware');
const cors = require('cors');
const WS = require("ws");
const HttpServer = require('http');



module.exports = class Server {
  _app;
  _server;
  _port;
  _defaultPort = 5000;
  _webSocketServer;
  _onlineUsers = new Map();

  constructor(port) {
    this._port = port || this._defaultPort;
    this._app = express();
    this._applyMiddlewares();
    this._server = HttpServer.createServer();

    this._webSocketServer =  new WS.Server({server: this._server});
    this._server.on('request', this._app);

    this._initWebSockets();
  }



  _applyMiddlewares() {
    const HOST_NAME = process.env.HOST_NAME;
    const CLIENT_PORT = process.env.CLIENT_PORT;

    this._app.use(corsConfigMiddleware);
    this._app.use(cors({
      origin: `http://${HOST_NAME}:${CLIENT_PORT}`,
    }));
    console.log(HOST_NAME);
    this._app.use(express.json());
    this._app.use(cookieParser());
    this._app.use('/api', apiRouter);
    this._app.use(errorMiddleware());
  }

  _initWebSockets(websocketServer = this._webSocketServer) {

    websocketInitialization(websocketServer);

  }


  listen(callback) {
    this._server.listen(this._port, callback);
  }

}


