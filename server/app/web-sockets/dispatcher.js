const {CHAT_MESSAGE, ERROR_OCCUR} = require('./message-events');
const ChatService = require("../services/chat.service");
const MessageDto = require("../dtos/message.dto");

module.exports = async function dispatcher(message, webSocketServer, ws) {
  switch (message.event) {
    case CHAT_MESSAGE: {
      return await chatMessageEvent(message, webSocketServer, ws);
    }
    case "test-message": {

      webSocketServer.onlineUsers.forEach((sessions) => {
        sessions.forEach(sessionWs => sessionWs.send(JSON.stringify(message)));
      });

      break;
    }
    default: {
      ws.send(JSON.stringify({event: ERROR_OCCUR, content: 'Unknown error'}));
    }
  }

}

async function chatMessageEvent(message, webSocketServer, ws) {
  if (!ws.user || !message.payload || !message.payload.chatId || !message.payload.body)
    return;

  const chatParticipants = await ChatService.getChatParticipants(ws.user.id, message.payload.chatId);

  if (!chatParticipants)
    return;

  const chatMessage = createChatMessage(message.payload.chatId, ws.user, message.payload.body);
  const wsMessage = createWsMessage(CHAT_MESSAGE, {...chatMessage});

  for (let participant of chatParticipants) {
    if (participant.userId === ws.user.id)
      continue;

    const participantSessions = webSocketServer.onlineUsers.get(participant.userId);
    if (!participantSessions)
      continue;

    participantSessions.forEach(sessionWs => {console.log(sessionWs.user.username);sessionWs.send(wsMessage)});
  }
}

function createChatMessage(chatId, sender, body) {

  const model = {
    id: 'temp-id',
    authorId: sender.id,
    authorName: sender.name,
    chatId,
    registry: 2,
    date: '12-03-2002',
    body
  }

  return new MessageDto(model);
}

function createWsMessage(event, payload) {

  return JSON.stringify({event, payload});

}


