const Router = require('express').Router;
const UserController = require('../controllers/user.controller');
const { body } = require('express-validator');
const { param } = require('express-validator');
const authMiddleware = require('../middlerwares/auth.middleware');

const userRouter = new Router({
  strict: true
});

userRouter.get(
  '/data/:userId',
  param('userId', 'Contact id must be UUID v4')
    .isUUID(4),
  UserController.getUserDataById
);

userRouter.get(
  '/find/:username',
  param('username', 'Username is required')
    .exists().toLowerCase(),
  UserController.findUser
);

userRouter.get(
  '/',
  UserController.getUserData
);

userRouter.get(
  '/contacts',
  UserController.getContacts
);

userRouter.post(
  '/contacts/add',
  body('contactId', 'Contact id required').exists(),
  body('contactId', 'Contact id must be UUID v4')
    .isUUID(4),
  UserController.addContact
);

userRouter.post(
  '/contacts/remove',
  body('contactId', 'Contact id required').exists(),
  body('contactId', 'Contact id must be UUID v4')
    .isUUID(4),
  UserController.removeContact
);

userRouter.get(
  '/chats',
  UserController.getChats
);

module.exports = userRouter;
