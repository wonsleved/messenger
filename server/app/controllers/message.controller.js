const MessageService = require('../services/message.service');

class ChatController {
  static async newMessage(req, res, next) {
    try {
      const userId = req.user.id;
      const chatId = req.params.chatId;
      const messageContent = req.body.content;

      const messageData = await MessageService.createMessage(userId, chatId, messageContent);
      return res.json(messageData);
    } catch (e) {
      next(e);
    }
  }

  static async getAllMessages(req, res, next) {
    try {
      const userId = req.user.id;
      const chatId = req.params.chatId;

      const messages = await MessageService.getAllMessages(userId, chatId);
      return res.json(messages);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = ChatController;
