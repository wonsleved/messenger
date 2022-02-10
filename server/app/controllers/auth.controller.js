const config = require('../config/config.js');

const AuthService = require('../services/auth.service');


class AuthController {
  static async register(req, res, next) {
    try {
      //  register
      const {username, name, password} = req.body;
      const userData = await AuthService.register(username, name, password);

      //  add refresh to cookie;
      const cookieOptions = config.cookieOptions.refreshToken;
      res.cookie('refreshToken', userData.refreshToken, cookieOptions); // 30 days

      return res.send(userData);
    } catch (e) {
      console.log(e);
    }
  }

  static async login(req, res, next) {
    try {
      //  login
      const {username, password} = req.body;
      const userData = await AuthService.login(username, password);

      //  add refresh to cookie;
      const cookieOptions = config.cookieOptions.refreshToken;
      res.cookie('refreshToken', userData.refreshToken, cookieOptions); // 30 days

      return res.send(userData);
    } catch (e) {
      console.log(e);
    }
  }

  static async logout(req, res, next) {
    try {
      //  remove refresh token from db
      const { refreshToken } = req.cookies;
      const tokenData = await AuthService.logout(refreshToken);

      //  remove from cookie
      res.clearCookie('refreshToken');

      return res.send(tokenData);
    } catch (e) {
      console.log(e);
    }
  }

  static async delete(req, res, next) {
    try {
      const { username } = req.body;
      const userData = await AuthService.delete(username);
      return res.send(userData);
    } catch (e) {
      console.log(e);
    }
  }

  static async refresh(req, res, next) {
    try {
      // cookie
      const { refreshToken } = req.cookies;
      const userData = await AuthService.refresh(refreshToken);
      return res.send(userData);
    } catch (e) {
      console.log(e);
    }
  }

  static async getAllUsers(req, res, next) {
    try {
      const users = await AuthService.getAllUsers();
      return res.send(users);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = AuthController;