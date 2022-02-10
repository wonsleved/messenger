const Router = require('express').Router;
const AuthController = require('../controllers/auth.controller');

const authRouter = new Router();

authRouter.post('/register', AuthController.register);

authRouter.post('/login', AuthController.login);

authRouter.post('/logout', AuthController.logout);

//  For test
authRouter.post('/delete', AuthController.delete);

authRouter.post('/refresh', AuthController.refresh);

//  Fro test
authRouter.get('/users', AuthController.getAllUsers);

module.exports = authRouter;
