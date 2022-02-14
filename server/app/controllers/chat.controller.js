const config = require('../config/config.js');
const { validationResult } = require('express-validator');
const ApiException = require('../exceptions/api.exception');
const { INVALID_CREDENTIALS } = require('../exceptions/api.errors');

const ChatService = require('../services/chat.service');

class ChatController {
  static async getChatData(req, res, next) {
    try {

    } catch (e) {
      next(e);
    }
  }

  static async getChatParticipants(req, res, next) {
    try {

    } catch (e) {
      next(e);
    }
  }

  static async createChat(req, res, next) {
    try {

    } catch (e) {
      next(e);
    }
  }

  static async deleteChat(req, res, next) {
    try {

    } catch (e) {
      next(e);
    }
  }

  static async addUserToChat(req, res, next) {
    try {

    } catch (e) {
      next(e);
    }
  }

  static async removeUserFromChat(req, res, next) {
    try {

    } catch (e) {
      next(e);
    }
  }

  static async leaveChat(req, res, next) {
    try {

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

module.exports = ChatController;
