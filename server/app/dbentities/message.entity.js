const db = require('../dbconfing/db-conntector');
const ChatEntity = require('./chat.entity');
const { v4: uuidv4 } = require('uuid');

class MessageEntity {
  static async addMessage(authorId, chatId, messageBody) {
    const uuid = uuidv4();
    const date = new Date().toISOString();

    await db.query(
      `
        INSERT INTO "message"
        (id, conversation_id, author_id, created_at, body)
        VALUES ($1, $2, $3, $4, $5)
      `,
      [uuid, chatId, authorId, date, messageBody],
    );

    return {
      messageId: uuid,
      date,
    };
  }

  static async addMessageToRegistry(messageId, ownerId, registry, date) {
    const queryResult = await db.query(
      `
        INSERT INTO "message_registry"
        (message_id, owner_id, registry, created_at)
        VALUES ($1, $2, $3, $4)
      `,
      [messageId, ownerId, registry, date],
    );

    return queryResult;
  }

  static async getUserMessageInfo(ownerId, messageId) {
    const queryResult = await db.query(
      `
        SELECT id, "authorId", "authorName", "chatId", registry, body, body
        FROM "message_registry" INNER JOIN (
            SELECT "message".id AS "id", author_id AS "authorId", body,
                   name AS "authorName", conversation_id AS "chatId"
            FROM "message" INNER JOIN "user" u on message.author_id = u.id
            WHERE "message".id=$1 
            ) m on "message_registry".message_id = m.id
        WHERE owner_id=$2;
      `,
      [messageId, ownerId],
    );

    return queryResult.rows[0];
  }

  static async getMessages(ownerId, chatId, start, end) {
    // !!!!!!!
    let queryResult;

    if (!start || !end) {
      queryResult = await db.query(
        `
        SELECT id, "authorId", "authorName", "chatId", registry, created_at AS "date", body
        FROM "message_registry" INNER JOIN (
            SELECT "message".id AS "id", author_id AS "authorId", body,
                   name AS "authorName", conversation_id AS "chatId"
            FROM "message" INNER JOIN "user" u on message.author_id = u.id
            WHERE conversation_id=$1
            ) m on "message_registry".message_id = m.id
        WHERE owner_id=$2
        ORDER BY "date";
      `,
        [chatId, ownerId],
      );
    } else {
      queryResult = await db.query(
        `
        SELECT id, "authorId", "authorName", "chatId", registry, created_at AS "date", body
        FROM "message_registry" INNER JOIN (
            
            SELECT "message".id AS "id", author_id AS "authorId", body,
                   name AS "authorName", conversation_id AS "chatId"
            FROM "message" INNER JOIN "user" u on message.author_id = u.id
            WHERE conversation_id=$1
            
            ) m on "message_registry".message_id = m.id
        WHERE owner_id=$2
        ORDER BY "date"
        BETWEEN $3 AND $4;
        `,
        [chatId, ownerId, start, end],
      );
    }

    return queryResult.rows;
  }
}

module.exports = MessageEntity;
