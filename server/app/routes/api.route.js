const Router = require('express').Router;
const authRouter = require('./auth.route');

const apiRouter = new Router();

apiRouter.use('/auth', authRouter);

module.exports = apiRouter;
