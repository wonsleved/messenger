const config = require('../config/config.js');

const AuthService = require('../services/auth.service');

class AuthController {
  static async register(req, res, next) {
    try {
      //  register
      const { username, name, password } = req.body;
      const userData = await AuthService.register(username, name, password);

      //  add refresh to cookie;
      const cookieOptionsRefreshToken = config.cookieOptions.refreshToken;
      const cookieOptionsAccessToken = config.cookieOptions.refreshToken;
      res.cookie('refreshToken', userData.refreshToken, cookieOptionsRefreshToken); // 30 days
      res.cookie('accessToken', userData.accessToken, cookieOptionsAccessToken); // 30 minutes

      return res.send(userData);
    } catch (e) {
      next(e);
    }
  }

  static async login(req, res, next) {
    try {
      //  login
      const { username, password } = req.body;
      const userData = await AuthService.login(username, password);

      //  add refresh to cookie;
      const cookieOptionsRefreshToken = config.cookieOptions.refreshToken;
      const cookieOptionsAccessToken = config.cookieOptions.refreshToken;
      res.cookie('refreshToken', userData.refreshToken, cookieOptionsRefreshToken); // 30 days
      res.cookie('accessToken', userData.accessToken, cookieOptionsAccessToken); // 30 minutes

      return res.send(userData);
    } catch (e) {
      next(e);
    }
  }

  static async logout(req, res, next) {
    try {
      //  remove refresh token from db
      const { refreshToken } = req.cookies;
      const tokenData = await AuthService.logout(refreshToken);

      //  remove from cookie
      res.clearCookie('refreshToken');
      res.clearCookie('accessToken');

      return res.send(tokenData);
    } catch (e) {
      next(e);
    }
  }

  static async delete(req, res, next) {
    try {
      const { username } = req.body;
      const userData = await AuthService.delete(username);
      return res.send(userData);
    } catch (e) {
      next(e);
    }
  }

  static async refresh(req, res, next) {
    try {
      // get refresh from cookie
      const { refreshToken } = req.cookies;
      const userData = await AuthService.refresh(refreshToken);

      //  update refresh in cookie
      const cookieOptionsRefreshToken = config.cookieOptions.refreshToken;
      const cookieOptionsAccessToken = config.cookieOptions.refreshToken;
      res.cookie('refreshToken', userData.refreshToken, cookieOptionsRefreshToken); // 30 days
      res.cookie('accessToken', userData.accessToken, cookieOptionsAccessToken); // 30 minutes
      return res.send(userData);
    } catch (e) {
      next(e);
    }
  }

  static async getAllUsers(req, res, next) {
    try {
      const users = await AuthService.getAllUsers();
      return res.send(users);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = AuthController;
