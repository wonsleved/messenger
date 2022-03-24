const {CHAT_MESSAGE, ERROR_OCCUR} = require('./message-events');
const ChatService = require("../services/chat.service");
const MessageDto = require("../dtos/message.dto");
const createWsMessage = require("./createWsMessage");
const MessageService = require("../services/message.service");

const MY_NOT_READ = 0;
const OTHER_NOT_READ = 2;

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
      throw new Error('Unknown type of message');
    }
  }
}

async function chatMessageEvent(message, webSocketServer, ws) {
  if (!ws.user || !message.payload || !message.payload.chatId || !message.payload.body)
    return;

  const chatParticipants = await ChatService.getChatParticipants(ws.user.id, message.payload.chatId);

  if (!chatParticipants)
    return;

  const messageInfo = await MessageService.createMessage(ws.user.id, message.payload.chatId, message.payload.body);

  const chatAddresseeMessage = createChatMessage(messageInfo, OTHER_NOT_READ);
  const chatOwnerMessage = createChatMessage(messageInfo, MY_NOT_READ);
  const wsAddresseeMessage = createWsMessage(CHAT_MESSAGE, {...chatAddresseeMessage});
  const wsOwnerMessage = createWsMessage(CHAT_MESSAGE, {...chatOwnerMessage});

  for (let participant of chatParticipants) {
    const participantSessions = webSocketServer.onlineUsers.get(participant.userId);
    if (!participantSessions)
      continue;

    if (participant.userId === ws.user.id) {
      // continue;
      participantSessions.forEach(sessionWs => {
        if (sessionWs === ws)
          return;

        sessionWs.send(wsOwnerMessage)
      });
    } else {
      participantSessions.forEach(sessionWs => {sessionWs.send(wsAddresseeMessage)});
    }

  }
}

function createChatMessage(messageInfo, registry = OTHER_NOT_READ) {

  const model = {
    id: messageInfo.id,
    authorId: messageInfo.authorId,
    authorName: messageInfo.authorName,
    chatId: messageInfo.chatId,
    registry,
    date: messageInfo.date,
    body: messageInfo.body
  }

  return new MessageDto(model);
}


