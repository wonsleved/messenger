const Router = require('express').Router;
const { body } = require('express-validator');
const AuthController = require('../controllers/auth.controller');
const authMiddleware = require('../middlerwares/auth.middleware');
const {
  usernameValidation,
  nameValidation,
  passwordValidation,
} = require('../middlerwares/validate-credentials.middleware');

const authRouter = new Router();

authRouter.post(
  '/register',
  ...usernameValidation(),
  ...nameValidation(),
  ...passwordValidation(),
  AuthController.register,
);

authRouter.post(
  '/login',
  body('username', 'Username is required').exists().trim().toLowerCase(),
  body('password', 'Password is required').exists().trim(),
  AuthController.login,
);

authRouter.post('/logout', AuthController.logout);

//  For test
authRouter.post('/delete', AuthController.delete);

authRouter.post('/refresh', AuthController.refresh);

//  Fro test
authRouter.get('/users', authMiddleware(), AuthController.getAllUsers);

module.exports = authRouter;
