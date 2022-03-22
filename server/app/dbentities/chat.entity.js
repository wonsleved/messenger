const db = require('../dbconfing/db-conntector');
const { v4: uuidv4 } = require('uuid');

class ChatEntity {
  static async getUserAllChats(userId) {
    const queryResult = await db.query(
      `
        SELECT title, is_private AS "isPrivate", conversation_id AS "id", creator_id AS "creatorId", updated_at As "updatedAt"
        FROM "participant" INNER JOIN "conversation" 
        on conversation.id = participant.conversation_id
        AND user_id=$1 AND title IS NOT NULL
        UNION
        SELECT u.name as "title", is_private AS "isPrivate",
               conv.id as id, creator_id AS "creatorId", conv.updated_at AS "updatedAt"
        FROM ( SELECT is_private, id, creator_id, updated_at, p.user_id AS "person_id" FROM
                      (SELECT * FROM "participant" INNER JOIN "conversation" 
                on conversation.id = participant.conversation_id
                    AND user_id=$1 AND title IS NULL ) conv inner join "participant" p 
                        on conv.conversation_id = p.conversation_id AND conv.user_id != p.user_id) conv
        inner join "user" u on conv.person_id = u.id;
        `,
      [userId],
    );

    return queryResult.rows;
  }

  static async getUserChat(userId, chatId) {
    const queryResult = await db.query(
      `
        SELECT title, is_private AS "isPrivate", conversation_id AS "id", creator_id AS "creatorId", updated_at As "updatedAt"
        FROM "participant" INNER JOIN "conversation"
        on conversation.id = participant.conversation_id
        AND user_id=$1 AND conversation_id=$2;
        `,
      [userId, chatId],
    );

    return queryResult.rows[0];
  }

  static async getChatData(chatId, userId) {
    const queryResult = await db.query(
      `
      SELECT title, is_private AS "isPrivate",
             id as id, creator_id AS "creatorId", updated_at AS "updatedAt"
      FROM "conversation"
      WHERE id=$1 AND title IS NOT NULL
      UNION
      SELECT u.name as "title", is_private AS "isPrivate",
             conv.id as id, creator_id AS "creatorId", conv.updated_at AS "updatedAt"
      FROM ( SELECT * FROM
          (SELECT * FROM "conversation" WHERE id=$1 AND title IS NULL) 
              conv inner join participant p on conv.id = p.conversation_id
          WHERE p.user_id!=$2) 
      conv inner join "user" u on conv.user_id = u.id;
      `,
      [chatId, userId],
    );

    return queryResult.rows[0];
  }

  static async getChatParticipants(chatId) {
    const queryResult = await db.query(
      `
      SELECT user_id AS "userId", username, name, 
             last_visit_at AS "lastVisitAt", is_online AS "isOnline", updated_at AS "updatedAt"
      FROM "participant" INNER JOIN "user" 
      on "participant".user_id = "user".id 
      WHERE conversation_id=$1;
      `,
      [chatId],
    );

    return queryResult.rows;
  }

  static async getPrivateChatAddressee(userId, chatId) {
    const queryResult = await db.query(
      `
        SELECT id AS "userId", name, username, 
               last_visit_at AS "lastVisitAt", is_online AS "isOnline", updated_at AS "updatedAt"
        FROM "participant" INNER JOIN "user" 
            on participant.user_id = "user".id
        WHERE user_id!=$1 AND conversation_id=$2;
        `,
      [userId, chatId],
    );

    return queryResult.rows[0];
  }

  static async findUserChat(userId, chatId) {
    const queryResult = await db.query(
      `
        SELECT user_id AS userId, conversation_id AS conversationId 
        FROM "participant" WHERE user_id=$1 AND conversation_id=$2;
        `,
      [userId, chatId],
    );

    return queryResult.rows[0];
  }

  static async createChat(userId, title, isPrivate) {
    const date = new Date().toISOString();
    const chatId = uuidv4();

    await db.query(
      `
        INSERT INTO "conversation" (id, is_private, title, creator_id, created_at) VALUES ($1, $2, $3, $4, $5);
        `,
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
      `SELECT one.conversation_id AS "conversationId" 
        FROM (SELECT one.conversation_id FROM "participant" one INNER JOIN "participant" another on 
            one.conversation_id = another.conversation_id 
            WHERE one.user_id=$1 AND another.user_id=$2) one 
            INNER JOIN "conversation" conv on one.conversation_id = conv.id AND title IS NULL;
            `,
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
