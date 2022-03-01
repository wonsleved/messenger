const authMiddleware = require('../middlerwares/auth.middleware');
const Router = require('express').Router;
const authRouter = require('./auth.route');
const userRouter = require('./user.route');
const chatRouter = require('./chat.route');
const messageRouter = require('./message.route');

const apiRouter = new Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/user', authMiddleware(), userRouter);
apiRouter.use('/chat', authMiddleware(), chatRouter);
apiRouter.use('/message', authMiddleware(), messageRouter);

module.exports = apiRouter;
