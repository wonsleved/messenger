const db = require('../dbconfing/db-conntector');
const { v4: uuidv4 } = require('uuid');

class ChatEntity {
  static async getUserAllChats(userId) {
    const queryResult = await db.query(
      'SELECT title, is_private AS "isPrivate", conversation_id AS "conversationId", creator_id AS "creatorId"' +
        'FROM "participant" INNER JOIN "conversation" ' +
        'on conversation.id = participant.conversation_id ' +
        'AND user_id=$1',
      [userId],
    );

    return queryResult.rows;
  }

  static async getUserChat(userId, chatId) {
    // delete later?
    const queryResult = await db.query(
      'SELECT title, is_private AS "isPrivate", conversation_id AS "conversationId", creator_id AS "creatorId" ' +
        'FROM "participant" INNER JOIN "conversation" ' +
        'on conversation.id = participant.conversation_id ' +
        'AND user_id=$1 AND conversation_id=$2;',
      [userId, chatId],
    );

    return queryResult.rows[0];
  }

  static async getChatData(chatId) {
    const queryResult = await db.query(
      'SELECT title, is_private AS "isPrivate", ' +
        'id AS "conversationId", creator_id AS "creatorId" ' +
        'FROM "conversation" WHERE id=$1;',
      [chatId],
    );

    return queryResult.rows[0];
  }

  static async getChatParticipants(chatId) {
    const queryResult = await db.query(
      'SELECT user_id AS "userId", username, name, last_visit_at AS "lastVisitAt", is_online AS "isOnline" ' +
        'FROM "participant" INNER JOIN "user" ' +
        'on "participant".user_id = "user".id ' +
        'WHERE conversation_id=$1',
      [chatId],
    );

    return queryResult.rows;
  }

  static async findUserChat(userId, chatId) {
    const queryResult = await db.query(
      'SELECT user_id AS userId, conversation_id AS conversationId ' +
        'FROM "participant" WHERE user_id=$1 AND conversation_id=$2;',
      [userId, chatId],
    );

    return queryResult.rows[0];
  }

  static async createChat(userId, title, isPrivate) {
    const date = new Date().toISOString();
    const chatId = uuidv4();

    await db.query(
      'INSERT INTO "conversation" (id, is_private, title, creator_id, created_at) VALUES ($1, $2, $3, $4, $5);',
      [chatId, isPrivate, title, userId, date],
    );

    return chatId;
  }

  static async addParticipant(chatId, userId) {
    const query = await db.query(
      'INSERT INTO "participant" (conversation_id, user_id) VALUES ($1, $2)',
      [chatId, userId],
    );

    return query;
  }

  static async findPrivateChat(oneUserId, anotherUserId) {
    const query = await db.query(
      'SELECT * FROM "participant" one INNER JOIN "participant" another on one.conversation_id = another.conversation_id WHERE one.user_id=$1 AND another.user_id=$2',
      [oneUserId, anotherUserId],
    );

    return query.rows[0];
  }

  static async deleteAllParticipants(chatId) {
    const query = await db.query('DELETE FROM "participant" WHERE conversation_id=$1', [chatId]);

    return query;
  }

  static async removeParticipant(chatId, userId) {
    const query = await db.query(
      'DELETE FROM "participant" WHERE conversation_id=$1 AND user_id=$2',
      [chatId, userId],
    );

    return query;
  }
}

module.exports = ChatEntity;
