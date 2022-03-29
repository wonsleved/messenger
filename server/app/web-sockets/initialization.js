const ApiException = require("../exceptions/api.exception");
const TokenService = require("../services/token.service");
const UserEntity = require("../dbentities/user.entity");

const dispatcher = require('./dispatcher');
const createWsMessage = require('./createWsMessage');
const {message} = require("../config/config");
const {ERROR_OCCUR} = require('./message-events');

const UNAUTHORIZED_CODE = 4001;


module.exports = function websocketInitialization(websocketServer) {
  websocketServer.onlineUsers = new Map();

  websocketServer.on('headers', onHeaders);

  websocketServer.on('connection', onConnection.bind(null, websocketServer));
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

async function connectionSettings(websocketServer, ws, req) {
    ws.user = await verifyUser(req);

    let userSessions = websocketServer.onlineUsers.get(ws.user.id);
    if (userSessions)
      websocketServer.onlineUsers.set(ws.user.id, [...userSessions, ws]);
    else
      websocketServer.onlineUsers.set(ws.user.id, [ws]);
}

function onHeaders(headers, req) {
  if (!req.headers.cookie)
    return req.headerObject = {};

  const headersArray = req.headers.cookie.split('; ').map(cookie => cookie.split('='));
  req.headerObject = Object.fromEntries(new Map(headersArray));
}

async function onConnection(websocketServer, ws, req) {``
  try {
    await connectionSettings(websocketServer, ws, req);

    ws.on('message', onMessage);

    ws.on('close', onClose);

    ws.on('error', (error) => onError(error, ws));

  } catch (error) {
    onError(error, ws);
  }

  async function onMessage(message) {
    try {
      message = JSON.parse(message);
      await dispatcher(message, websocketServer, ws);
    } catch (error) {
      onError(error, ws);
    }
  }

  function onClose() {
    console.log('close');

    let userSessions = websocketServer.onlineUsers.get(ws.user.id);

    if (userSessions && userSessions.length > 1) {
      userSessions = userSessions.filter(sessionWs => sessionWs !== ws);
      websocketServer.onlineUsers.set(ws.user.id, userSessions);
    } else {
      websocketServer.onlineUsers.delete(ws.user.id);
    }
  }


}

function onError(error, ws) {
  let errorCode;
  if (error instanceof ApiException) {
    if (error.status === 401) ws.close(UNAUTHORIZED_CODE);
    errorCode = error.status;
  }
  else
    errorCode = 1006;


  const errorInfo = {message: error.message, code: errorCode}
  const message = createWsMessage(ERROR_OCCUR, errorInfo);
  ws.send(message);
}



