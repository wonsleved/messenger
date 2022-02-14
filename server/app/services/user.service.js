const db = require('../dbconfing/db-conntector');
const UserEntity = require('../dbentities/user.entity');
const ContactEntity = require('../dbentities/contact.entity');
const ChatEntity = require('../dbentities/chat.entity');
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

class UserService {
  static async getUserData(userId) {
    const {
      name,
      username,
      is_online: isOnline,
      last_visit_at: lastVisitAt,
    } = await UserEntity.findById(userId);
    const userData = { userId, username, name, isOnline, lastVisitAt };
    return userData;
  }

  static async findUser(username) {
    const {
      id: userId,
      name,
      is_online: isOnline,
      last_visit_at: lastVisitAt,
    } = await UserEntity.findByUsername(username);
    const userData = { userId, username, name, isOnline, lastVisitAt };
    return userData;
  }

  static async getContacts(userId) {
    const userContactsId = await ContactEntity.getAllContacts(userId);
    let userContacts = [];

    for (let userObj of userContactsId) { // change query in db entity
      let {
        id: userId,
        name,
        username,
        last_visit_at: lastVisitAt,
        is_online: isOnline,
      } = await UserEntity.findById(userObj.contact_id);
      let userData = { userId, username, name, lastVisitAt, isOnline };
      userContacts.push(userData);
    }
    return userContacts;
  }

  static async getChats(userId) {
    const userChats = await ChatEntity.getUserAllChats(userId);

    return userChats;
  }

  static async addContact(userId, contactId) {
    if (userId === contactId) throw ApiException.badRequest(CONTACT_ADD_YOURSELF);

    // check if already exists
    const contactData = await ContactEntity.getContact(userId, contactId);

    if (contactData) throw ApiException.badRequest(CONTACT_ALREADY_EXISTS);

    const queryResult = await ContactEntity.addContact(userId, contactId);
    return queryResult;
  }

  static async removeContact(userId, contactId) {
    if (userId === contactId) throw ApiException.badRequest(CONTACT_REMOVE_YOURSELF);

    // check if already exists
    const contactData = await ContactEntity.getContact(userId, contactId);

    if (!contactData) throw ApiException.badRequest(CONTACT_NOT_EXIST);

    const queryResult = await ContactEntity.removeContact(userId, contactId);

    return queryResult;
  }
}

module.exports = UserService;
