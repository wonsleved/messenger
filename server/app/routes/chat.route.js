const Router = require('express').Router;
const ChatController = require('../controllers/chat.controller');
const { body } = require('express-validator');
const { param } = require('express-validator');

const chatRouter = new Router({
  strict: true,
});

chatRouter.get('/data/:id', ChatController.getChatData);

chatRouter.get('/participants/:id', ChatController.getChatParticipants);

chatRouter.post('/new', ChatController.createChat);

chatRouter.delete('/', ChatController.deleteChat);

chatRouter.post('/add', ChatController.addUserToChat);

chatRouter.delete('/remove', ChatController.removeUserFromChat);

chatRouter.post('/leave', ChatController.leaveChat);


module.exports = chatRouter;
