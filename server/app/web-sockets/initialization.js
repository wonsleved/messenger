const ApiException = require("../exceptions/api.exception");
const TokenService = require("../services/token.service");
const UserEntity = require("../dbentities/user.entity");

const dispatcher = require('./dispatcher');


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
  const headersArray = req.headers.cookie.split('; ').map(cookie => cookie.split('='));
  req.headerObject = Object.fromEntries(new Map(headersArray));
}

async function onConnection(websocketServer, ws, req) {
  try {

    await connectionSettings(websocketServer, ws, req);

    ws.on('message', message => {
      message = JSON.parse(message);
      dispatcher(message, websocketServer, ws);
    });

    ws.on('close', () => {
      console.log('close');

      let userSessions = websocketServer.onlineUsers.get(ws.user.id);

      if (userSessions && userSessions.length > 1) {
        userSessions = userSessions.filter(sessionWs => sessionWs !== ws);
        websocketServer.onlineUsers.set(ws.user.id, userSessions);
      } else {
        websocketServer.onlineUsers.delete(ws.user.id);
      }
    });

  } catch (e) {
    ws.send(e.message);
    ws.close();
  }
}
