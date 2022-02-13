const config = require('../config/config.js');
const { validationResult } = require('express-validator');
const ApiException = require('../exceptions/api.exception');
const { INVALID_CREDENTIALS } = require('../exceptions/api.errors');

const UserService = require('../services/user.service');

class UserController {
  static async getUserData(req, res, next) {
    try {
      const userId = req.user.id;
      const userData = await UserService.getUserData(userId);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  static async getUserDataById(req, res, next) {
    try {
      validateErrors(req);
      const userId = req.params.userId;
      const userData = await UserService.getUserData(userId);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  static async findUser(req, res, next) {
    try {
      validateErrors(req);

      const username = req.params.username;
      const userData = await UserService.findUser(username);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  static async getContacts(req, res, next) {
    try {
      const userId = req.user.id;
      const userContacts = await UserService.getContacts(userId);
      return res.json(userContacts);
    } catch (e) {
      next(e);
    }
  }

  static async addContact(req, res, next) {
    try {
      validateErrors(req);

      const userId = req.user.id;
      const { contactId } = req.body;
      await UserService.addContact(userId, contactId);
      return res.send("Success");
    } catch (e) {
      next(e);
    }
  }

  static async removeContact(req, res, next) {
    try {
      validateErrors(req);

      const userId = req.user.id;
      const { contactId } = req.body;
      await UserService.removeContact(userId, contactId);
      return res.send("Success");
    } catch (e) {
      next(e);
    }
  }

  static async getChats(req, res, next) {
    try {
      const userId = req.user.id;
      const userChats = await UserService.getChats(userId);
      return res.json(userChats);
    } catch (e) {
      next(e);
    }
  }
}

function validateErrors(req) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw ApiException.badRequest(INVALID_CREDENTIALS, errors);
  }
}

module.exports = UserController;
