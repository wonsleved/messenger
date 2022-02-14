const ApiException = require('../exceptions/api.exception');
const ChatEntity = require('../dbentities/chat.entity');
const { NO_ACCESS, INVALID_CREDENTIALS } = require('../exceptions/api.errors');
const { validationResult } = require('express-validator');

module.exports = () =>
  async function (req, res, next) {
    try {
      validateErrors(req);

      const userId = req.user.id;
      const chatId = req.body.chatId;

      const chatExists = await ChatEntity.findUserChat(userId, chatId);
      if (!chatExists) throw ApiException.badRequest(NO_ACCESS);

      next();
    } catch (e) {
      return next(e);
    }
  };

function validateErrors(req) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw ApiException.badRequest(INVALID_CREDENTIALS, errors);
  }
}
