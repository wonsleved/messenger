const Router = require('express').Router;
const ChatController = require('../controllers/chat.controller');
const { body } = require('express-validator');
const { param } = require('express-validator');
const { chat } = require('../config/config');
const chatAccessMiddleware = require('../middlerwares/chat-access.middleware');
const validateErrorsMiddleware = require('../middlerwares/validate-errors.middleware');

const chatRouter = new Router({
  strict: true,
});

chatRouter.get(
  '/data/:chatId',
  param('chatId', 'Chat id must be UUID v4').isUUID(4),
  validateErrorsMiddleware(),
  chatAccessMiddleware(),
  ChatController.getChatData,
);

chatRouter.get(
  '/addressee/:chatId',
  param('chatId', 'Chat id must be UUID v4').isUUID(4),
  validateErrorsMiddleware(),
  chatAccessMiddleware(),
  ChatController.getPrivateChatAddressee,
);

chatRouter.get(
  '/participants/:chatId',
  param('chatId', 'Chat id must be UUID v4').isUUID(4),
  validateErrorsMiddleware(),
  chatAccessMiddleware(),
  ChatController.getChatParticipants,
);

chatRouter.post(
  '/new',
  body('title', 'Title must exist').exists().trim(),
  body(
    'title',
    `Title length must be between ${chat.title.minLength} and ${chat.title.maxLength} characters long`,
  ).isLength({ min: chat.title.minLength, max: chat.title.maxLength }),
  validateErrorsMiddleware(),
  ChatController.createChat,
);

chatRouter.post(
  '/write/:userId',
  param('userId', 'Chat id must be UUID v4').isUUID(4),
  validateErrorsMiddleware(),
  ChatController.createPrivateChat,
);

chatRouter.delete(
  '/',
  body('chatId', 'Chat id must be UUID v4').isUUID(4),
  validateErrorsMiddleware(),
  chatAccessMiddleware(),
  ChatController.deleteChat,
);

chatRouter.post(
  '/add',
  body('userId', 'Chat id must be UUID v4').isUUID(4),
  body('chatId', 'Chat id must be UUID v4').isUUID(4),
  validateErrorsMiddleware(),
  chatAccessMiddleware(),
  ChatController.addUserToChat,
);

chatRouter.delete(
  '/remove',
  body('userId', 'Chat id must be UUID v4').isUUID(4),
  body('chatId', 'Chat id must be UUID v4').isUUID(4),
  validateErrorsMiddleware(),
  chatAccessMiddleware(),
  ChatController.removeUserFromChat,
);

chatRouter.post(
  '/leave',
  body('chatId', 'Chat id must be UUID v4').isUUID(4),
  validateErrorsMiddleware(),
  chatAccessMiddleware(),
  ChatController.leaveChat,
);

module.exports = chatRouter;
