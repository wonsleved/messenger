const db = require('../dbconfing/db-conntector');
const UserEntity = require('../dbentities/user.entity');
const ConversationEntity = require('../dbentities/conversation.entity');
const UserDto = require('../dtos/user.dto');
const { validationResult } = require('express-validator');
const ApiException = require('../exceptions/api.exception');
const {
  CONTACT_ALREADY_EXISTS,
  CONTACT_NOT_EXIST,
  CONTACT_ADD_YOURSELF,
  CONTACT_REMOVE_YOURSELF,
  INVALID_CREDENTIALS,
} = require('../exceptions/api.errors');

class ChatService {
  static async getChatData(userId, chatId) {

  }

  static async getChatParticipants(userId, chatId) {

  }

  static async createChat(userId) {

  }

  static async deleteChat(userId, chatId) {

  }

  static async addUserToChat(userId, chatId, userToAddId) {

  }

  static async removeUserFromChat(userId, chatId, userToRemoveId) {

  }

  static async leaveChat(userId, chatId) {

  }
}

module.exports = ChatService;
