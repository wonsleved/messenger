const Router = require('express').Router;
const MessageController = require('../controllers/message.controller');
const { body } = require('express-validator');
const { param } = require('express-validator');
const { chat } = require('../config/config');
const { message } = require('../config/config');
const chatAccessMiddleware = require('../middlerwares/chat-access.middleware');
const validateErrorsMiddleware = require('../middlerwares/validate-errors.middleware');

const chatRouter = new Router({
  strict: true,
});

chatRouter.post(
  '/new/:chatId',
  param('chatId', 'Chat id must be UUID v4').isUUID(4),
  body('content', 'Message content must exist!').exists(),
  body('content').trim(),
  body(
    'content',
    `Message must be between ${message.minLength} and ${message.maxLength} characters long`,
  ).isLength({ min: message.minLength, max: message.maxLength }),
  validateErrorsMiddleware(),
  chatAccessMiddleware(),
  MessageController.newMessage,
);

chatRouter.get(
  '/:chatId',
  param('chatId', 'Chat id must be UUID v4').isUUID(4),
  validateErrorsMiddleware(),
  chatAccessMiddleware(),
  MessageController.getAllMessages,
);

module.exports = chatRouter;
