const ChatService = require("../services/chat.service");
const MessageDto = require("../dtos/message.dto");
const createWsMessage = require("./createWsMessage");
const MessageService = require("../services/message.service");

const {
  CHAT_MESSAGE,
  ERROR_OCCUR,
  CHATS_UPDATE,
  CHAT_DELETE,
  CHAT_LEAVE,
  CHAT_REMOVE_PARTICIPANT,
  CHAT_ADD_PARTICIPANT,
  CHAT_CREATED} = require('./message-events');




const MY_NOT_READ = 0;
const OTHER_NOT_READ = 2;

module.exports = async function dispatcher(message, webSocketServer, ws) {
  console.log(message);
  switch (message.event) {
    case CHAT_MESSAGE: {
      return await chatMessageEvent(message, webSocketServer, ws);
    }
    case CHATS_UPDATE: {
      return await chatsUpdate(message, webSocketServer, ws);
    }
    case CHAT_DELETE: {
      return await chatDeleted(message, webSocketServer, ws);
    }
    case CHAT_LEAVE: {
      return await chatLeave(message, webSocketServer, ws);
    }
    case CHAT_REMOVE_PARTICIPANT: {
      return await updateUserChats(message, webSocketServer, ws);
    }
    case CHAT_ADD_PARTICIPANT: {
      return await updateUserChats(message, webSocketServer, ws);
    }
    case CHAT_CREATED: {
      return await chatCreated(message, webSocketServer, ws);
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

async function chatsUpdate(message, webSocketServer, ws) {
  if (!ws.user || !message.payload || !message.payload.chatId)
    return;

  const chatParticipants = await ChatService.getChatParticipants(ws.user.id, message.payload.chatId);

  if (!chatParticipants)
    return;

  const messageInfo = JSON.stringify({event: CHATS_UPDATE});

  for (let participant of chatParticipants) {
    const participantSessions = webSocketServer.onlineUsers.get(participant.userId);
    if (!participantSessions)
      continue;

    participantSessions.forEach(sessionWs => {
      if (sessionWs === ws)
        return;

      sessionWs.send(messageInfo)
    });

  }
}

async function chatDeleted(message, webSocketServer, ws) {
  if (!ws.user || !message.payload || !message.payload.chatId)
    return;

  const chatParticipants = await ChatService.getChatParticipants(ws.user.id, message.payload.chatId);

  if (!chatParticipants)
    return;

  const messageInfo = JSON.stringify({event: CHATS_UPDATE});

  for (let participant of chatParticipants) {
    const participantSessions = webSocketServer.onlineUsers.get(participant.userId);
    if (!participantSessions)
      continue;

    participantSessions.forEach(sessionWs => {
      if (sessionWs === ws)
        return;

      sessionWs.send(messageInfo)
    });

  }
}

async function chatCreated(message, webSocketServer, ws) {
  if (!ws.user || !message.payload || !message.payload.chatId)
    return;

  const messageInfo = JSON.stringify({event: CHATS_UPDATE});

  const userSessions = webSocketServer.onlineUsers.get(ws.user.id);
  if (!userSessions)
    return;

  userSessions.forEach(sessionWs => {
    if (sessionWs === ws)
      return;

    sessionWs.send(messageInfo)
  });
}

async function chatLeave(message, webSocketServer, ws) {
  if (!ws.user || !message.payload || !message.payload.chatId)
    return;

  const messageInfo = JSON.stringify({event: CHATS_UPDATE});

  const userSessions = webSocketServer.onlineUsers.get(ws.user.id);
  if (!userSessions)
    return;

  userSessions.forEach(sessionWs => {
    if (sessionWs === ws)
      return;

    sessionWs.send(messageInfo)
  });
}


async function updateUserChats(message, webSocketServer, ws) {
  if (!ws.user || !message.payload || !message.payload.chatId || !message.payload.userId)
    return;

  const messageInfo = JSON.stringify({event: CHATS_UPDATE});

  const userSessions = webSocketServer.onlineUsers.get(message.payload.userId);
  if (!userSessions)
    return;

  userSessions.forEach(sessionWs => {
    if (sessionWs === ws)
      return;

    sessionWs.send(messageInfo);
  });
}


