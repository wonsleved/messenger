const Router = require('express').Router;
const ChatController = require('../controllers/chat.controller');
const { body } = require('express-validator');
const { param } = require('express-validator');
const { chat } = require('../config/config');

const chatRouter = new Router({
  strict: true,
});

chatRouter.get(
  '/data/:chatId',
  param('chatId', 'Chat id must be UUID v4').isUUID(4),
  ChatController.getChatData,
);

chatRouter.get(
  '/participants/:chatId',
  param('chatId', 'Chat id must be UUID v4').isUUID(4),
  ChatController.getChatParticipants,
);

chatRouter.post(
  '/new',
  body('title', 'Title must exist').exists().trim(),
  body(
    'title',
    `Title length must be between ${chat.title.minLength} and ${chat.title.maxLength} characters long`,
  ).isLength({ min: chat.title.minLength, max: chat.title.maxLength }),
  ChatController.createChat,
);

chatRouter.post(
  '/new/:userId',
  param('userId', 'Chat id must be UUID v4').isUUID(4),
  ChatController.createPrivateChat,
);

chatRouter.delete(
  '/',
  body('chatId', 'Chat id must be UUID v4').isUUID(4),
  ChatController.deleteChat,
);

chatRouter.post(
  '/add',
  body('userId', 'Chat id must be UUID v4').isUUID(4),
  body('chatId', 'Chat id must be UUID v4').isUUID(4),
  ChatController.addUserToChat,
);

chatRouter.delete(
  '/remove',
  body('userId', 'Chat id must be UUID v4').isUUID(4),
  body('chatId', 'Chat id must be UUID v4').isUUID(4),
  ChatController.removeUserFromChat,
);

chatRouter.post(
  '/leave',
  body('chatId', 'Chat id must be UUID v4').isUUID(4),
  ChatController.leaveChat,
);

module.exports = chatRouter;
