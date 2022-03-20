const express = require('express');
const cookieParser = require('cookie-parser');
const apiRouter = require('./routes/api.route');
const errorMiddleware = require('./middlerwares/error.middleware');
const corsConfigMiddleware = require('./middlerwares/cors-config.middleware');
const cors = require('cors');
const WS = require("ws");
const HttpServer = require('http');

const ApiException = require("./exceptions/api.exception");
const TokenService = require("./services/token.service");
const UserEntity = require("./dbentities/user.entity");


const MassageService = require('./services/message.service');
const ChatService = require('./services/chat.service');




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
    this._app.use(express.json());
    this._app.use(cookieParser());
    this._app.use('/api', apiRouter);
    this._app.use(errorMiddleware());
  }

  _initWebSockets(webSocket = this._webSocketServer) {

    webSocket.on('headers', (headers, req) => {
      const headersArray = req.headers.cookie.split('; ').map(cookie => cookie.split('='));
      req.headerObject = Object.fromEntries(new Map(headersArray));
    })

    webSocket.on('connection', async (ws, req) => {
      try {
        ws.user = await verifyUser(req);

        ws.onlineUsers = this._onlineUsers;

        console.log(ws.user);

        ws.send(`Whats uuuuup, ${ws.user.name}!!!`);


        // А если несколько клиентов на одном аккаунте?
        this._onlineUsers.set(ws.user.username, ws);

        ws.on('message', message => {
          message = JSON.parse(message);
          dispatcher(message, this._webSocketServer, ws);
        });

        ws.on('close', () => {
          console.log('close');
          this._onlineUsers.delete(ws.user.username);
        });

      } catch (e) {
        ws.send(e.message);
        ws.close();
      }
    });
  }


  listen(callback) {
    this._server.listen(this._port, callback);
  }

}

async function verifyUser(req) {
  const accessToken = req.headerObject.accessToken;
  if (!accessToken) throw ApiException.unauthorized();

  const userDataFromToken = TokenService.validateAccessToken(accessToken);
  if (!userDataFromToken) throw ApiException.unauthorized();

  const userDataQueryResult = await UserEntity.findByUsername(userDataFromToken.username);
  if (!userDataQueryResult) throw ApiException.unauthorized();

  return userDataFromToken;
}

async function dispatcher(message, webSocketServer, ws) {
  switch (message.event) {
    case "chat-message": {
      const chatParticipants = await ChatService.getChatParticipants(ws.user.id, message.chatId);


      for (let participant of chatParticipants) {

        const participantWs = ws.onlineUsers.get(participant.username)
        if (!participantWs)
          return;

        if (participantWs !== ws)
          participantWs.send(JSON.stringify(message))

      }

      break;
    }
  }

}