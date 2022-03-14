const db = require('../dbconfing/db-conntector');
const UserEntity = require('../dbentities/user.entity');
const ContactEntity = require('../dbentities/contact.entity');
const ChatEntity = require('../dbentities/chat.entity');
const { validationResult } = require('express-validator');
const ApiException = require('../exceptions/api.exception');
const ChatDto = require('../dtos/chat.dto');
const PublicUserDto = require('../dtos/public-user.dto');

const {
  CONTACT_ALREADY_EXISTS,
  CONTACT_NOT_EXIST,
  CONTACT_ADD_YOURSELF,
  CONTACT_REMOVE_YOURSELF,
  INVALID_CREDENTIALS,
  NOT_FOUND
} = require('../exceptions/api.errors');

class UserService {
  static async getUserData(userId) {
    const userData = new PublicUserDto(await UserEntity.findById(userId));
    return userData;
  }

  static async findUser(username) {
    console.log(username);
    const data = await UserEntity.findByUsername(username);

    if (!data)
      throw ApiException.notFound(NOT_FOUND);

    const userData = new PublicUserDto(data);
    return userData;
  }

  static async getContacts(userId) {
    const userContactsId = await ContactEntity.getAllContacts(userId);

    return userContactsId;
  }

  static async getChats(userId) {
    const userChats = (await ChatEntity.getUserAllChats(userId)).map((chat) => new ChatDto(chat));

    return userChats;
  }

  static async addContact(userId, contactId) {
    if (userId === contactId) throw ApiException.notAllowed(CONTACT_ADD_YOURSELF);

    // check if already exists
    const contactData = await ContactEntity.getContact(userId, contactId);

    if (contactData) throw ApiException.notAllowed(CONTACT_ALREADY_EXISTS);

    const queryResult = await ContactEntity.addContact(userId, contactId);
    return queryResult;
  }

  static async removeContact(userId, contactId) {
    if (userId === contactId) throw ApiException.notAllowed(CONTACT_REMOVE_YOURSELF);

    // check if already exists
    const contactData = await ContactEntity.getContact(userId, contactId);

    if (!contactData) throw ApiException.badRequest(CONTACT_NOT_EXIST);

    const queryResult = await ContactEntity.removeContact(userId, contactId);

    return queryResult;
  }
}

module.exports = UserService;
