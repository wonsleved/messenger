const db = require('../dbconfing/db-conntector');
const UserEntity = require('../dbentities/user.entity');
const ChatEntity = require('../dbentities/chat.entity');
const MessageEntity = require('../dbentities/message.entity');
const MessageDto = require('../dtos/message.dto');
const { validationResult } = require('express-validator');
const ApiException = require('../exceptions/api.exception');
const {
  OWNER_UNREAD,
  OWNER_READ,
  FOREIGN_UNREAD,
  FOREIGN_READ,
  SERVICE,
} = require('../message-registry/registries');

const {
  NO_ACCESS,
  CHAT_EXISTS,
  CHAT_YOURSELF,
  DELETE_PRIVATE_CHAT,
  ADD_TO_PRIVATE_CHAT,
  REMOVE_FROM_PRIVATE_CHAT,
  ALREADY_IN_CHAT,
  USER_NOT_EXIST,
  NO_USER_IN_CHAT,
  CHAT_ADD_YOURSELF,
  CHAT_REMOVE_YOURSELF,
  LEAVE_FROM_PRIVATE_CHAT,
} = require('../exceptions/api.errors');

class MessageService {
  static async createMessage(userId, chatId, messageBody) {
    // check if user in chat
    const userInChat = await ChatEntity.findUserInChat(chatId, userId);
    if (!userInChat)
      throw ApiException.accessDenied();

    let { messageId, date } = await MessageEntity.addMessage(userId, chatId, messageBody);

    //  add author to registry
    await MessageEntity.addMessageToRegistry(messageId, userId, OWNER_UNREAD, date);

    //  get all addressees
    let chatParticipants = await ChatEntity.getChatParticipants(chatId);
    let allAddresseesId = chatParticipants.map((user) => user.userId).filter((id) => id !== userId);

    //  add addressees to registry
    for (let addresseeId of allAddresseesId) {
      await MessageEntity.addMessageToRegistry(messageId, addresseeId, FOREIGN_UNREAD, date);
    }

    const messageData = new MessageDto(await MessageEntity.getUserMessageInfo(userId, messageId));

    return messageData;
  }

  static async getAllMessages(userId, chatId) {
    //  some check
    //  ...
    // check if user in chat
    const userInChat = await ChatEntity.findUserInChat(chatId, userId);
    if (!userInChat)
      throw ApiException.accessDenied();

    let messages = await MessageEntity.getMessages(userId, chatId);

    messages = messages.map((message) => new MessageDto(message));

    return messages;
  }
}

module.exports = MessageService;
