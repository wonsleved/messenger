const db = require('../dbconfing/db-conntector');
const UserEntity = require('../dbentities/user.entity');
const ChatEntity = require('../dbentities/chat.entity');
const ChatDto = require('../dtos/chat.dto');
const { validationResult } = require('express-validator');
const ApiException = require('../exceptions/api.exception');
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

class ChatService {
  static async getChatData(userId, chatId) {
    // get chat data
    const chatData = new ChatDto(await ChatEntity.getChatData(chatId));

    return chatData;
  }

  static async getPrivateChatAddressee(userId, chatId) {
    // get chat data
    const userInfo = await ChatEntity.getPrivateChatAddressee(userId, chatId);

    return userInfo;
  }

  static async getChatParticipants(userId, chatId) {
    // get chat participants
    const chatParticipants = await ChatEntity.getChatParticipants(chatId);

    return chatParticipants;
  }

  static async createChat(userId, title) {
    // create not private chat
    const chatId = await ChatEntity.createChat(userId, title, false);
    // add creator to chat
    await ChatEntity.addParticipant(chatId, userId);
    // get chat data
    const chatData = await ChatEntity.getChatData(chatId);
    return chatData;
  }

  static async createPrivateChat(creatorId, userId) {
    // check if user do not exist!!!
    if (userId === creatorId) throw ApiException.notAllowed(CHAT_YOURSELF);

    // check if user exists
    const userToAddExists = await UserEntity.findById(userId);
    if (!userToAddExists) throw ApiException.badRequest(USER_NOT_EXIST);

    // check if chat exists
    const {conversationId} = await ChatEntity.findPrivateChat(creatorId, userId); //
    if (conversationId)
      return this.getChatData(creatorId, conversationId);
      // throw ApiException.badRequest(CHAT_EXISTS);

    // create private chat
    const chatId = await ChatEntity.createChat(creatorId, null, true);
    // add creator to chat
    await ChatEntity.addParticipant(chatId, creatorId);
    // add user to chat
    await ChatEntity.addParticipant(chatId, userId);
    // get chat data
    const chatData = new ChatDto(await ChatEntity.getChatData(chatId));
    return chatData;
  }

  static async deleteChat(userId, chatId) {
    // get chat data
    const chatData = new ChatDto(await ChatEntity.getChatData(chatId));
    // forbid delete private chats
    if (chatData.isPrivate) throw ApiException.notAllowed(DELETE_PRIVATE_CHAT);
    // check access
    if (chatData.creatorId !== userId) throw ApiException.accessDenied();

    // delete participants, conversation not since messages references to it
    await ChatEntity.deleteAllParticipants(chatId);

    return chatData;
  }

  static async addUserToChat(userId, chatId, userToAddId) {
    if (userId === userToAddId) throw ApiException.notAllowed(CHAT_ADD_YOURSELF);

    // check if user to add exist
    const userToAddExists = await UserEntity.findById(userToAddId);
    if (!userToAddExists) throw ApiException.badRequest(USER_NOT_EXIST);

    // get chat data
    const chatData = new ChatDto(await ChatEntity.getChatData(chatId));
    // forbid add users to private chats
    if (chatData.isPrivate) throw ApiException.notAllowed(ADD_TO_PRIVATE_CHAT);

    // check if userToAdd already in chat
    const isUserInChat = await ChatEntity.findUserChat(userToAddId, chatId);
    if (isUserInChat) throw ApiException.badRequest(ALREADY_IN_CHAT);

    // add user to chat
    await ChatEntity.addParticipant(chatId, userToAddId);

    return chatData;
  }

  static async removeUserFromChat(userId, chatId, userToRemoveId) {
    if (userId === userToRemoveId) throw ApiException.notAllowed(CHAT_REMOVE_YOURSELF);

    // check if user to remove exist
    const userToAddExists = await UserEntity.findById(userToRemoveId);
    if (!userToAddExists) throw ApiException.badRequest(USER_NOT_EXIST);

    // get chat data
    const chatData = new ChatDto(await ChatEntity.getChatData(chatId));
    // forbid remove users to private chats
    if (chatData.isPrivate) throw ApiException.notAllowed(REMOVE_FROM_PRIVATE_CHAT);

    if (chatData.creatorId !== userId) throw ApiException.accessDenied();

    // check if userToAdd in chat
    const isUserInChat = await ChatEntity.findUserChat(userToRemoveId, chatId);
    if (!isUserInChat) throw ApiException.badRequest(NO_USER_IN_CHAT);

    // remove participant
    await ChatEntity.removeParticipant(chatId, userToRemoveId);

    return chatData;
  }

  static async leaveChat(userId, chatId) {
    // get chat data
    const chatData = new ChatDto(await ChatEntity.getChatData(chatId));
    // forbid logout from private chats
    if (chatData.isPrivate) throw ApiException.notAllowed(LEAVE_FROM_PRIVATE_CHAT);

    // remove participant
    await ChatEntity.removeParticipant(chatId, userId);

    return chatData;
  }
}

module.exports = ChatService;
