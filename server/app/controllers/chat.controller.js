const ChatService = require('../services/chat.service');

class ChatController {
  static async getChatData(req, res, next) {
    try {
      const userId = req.user.id;
      const chatId = req.params.chatId;
      const chatData = await ChatService.getChatData(userId, chatId);
      return res.json(chatData);
    } catch (e) {
      next(e);
    }
  }

  static async getPrivateChatAddressee(req, res, next) {
    try {
      const userId = req.user.id;
      const chatId = req.params.chatId;
      const chatData = await ChatService.getPrivateChatAddressee(userId, chatId);
      return res.json(chatData);
    } catch (e) {
      next(e);
    }
  }

  static async getChatParticipants(req, res, next) {
    try {
      const userId = req.user.id;
      const chatId = req.params.chatId;
      const chatParticipants = await ChatService.getChatParticipants(userId, chatId);
      return res.json(chatParticipants);
    } catch (e) {
      next(e);
    }
  }

  static async createChat(req, res, next) {
    try {
      const userId = req.user.id;
      const { title } = req.body;

      const chatData = await ChatService.createChat(userId, title);

      return res.json(chatData);
    } catch (e) {
      next(e);
    }
  }

  static async createPrivateChat(req, res, next) {
    try {
      const creatorId = req.user.id;
      const userId = req.params.userId;
      const chatData = await ChatService.createPrivateChat(creatorId, userId);
      return res.json(chatData);
    } catch (e) {
      next(e);
    }
  }

  static async deleteChat(req, res, next) {
    try {
      const userId = req.user.id;
      const chatId = req.body.chatId;
      const chatData = await ChatService.deleteChat(userId, chatId);
      return res.json(chatData);
    } catch (e) {
      next(e);
    }
  }

  static async addUserToChat(req, res, next) {
    try {
      const userId = req.user.id;
      const chatId = req.body.chatId;
      const userToAdd = req.body.userId;
      const chatData = await ChatService.addUserToChat(userId, chatId, userToAdd);
      return res.json(chatData);
    } catch (e) {
      next(e);
    }
  }

  static async removeUserFromChat(req, res, next) {
    try {
      const userId = req.user.id;
      const chatId = req.body.chatId;
      const userToRemoveId = req.body.userId;
      const chatData = await ChatService.removeUserFromChat(userId, chatId, userToRemoveId);
      return res.json(chatData);
    } catch (e) {
      next(e);
    }
  }

  static async leaveChat(req, res, next) {
    try {
      const userId = req.user.id;
      const chatId = req.body.chatId;
      const chatData = await ChatService.leaveChat(userId, chatId);
      return res.json(chatData);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = ChatController;
