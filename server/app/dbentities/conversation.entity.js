const db = require('../dbconfing/db-conntector');

class ConversationEntity {
  static async getUserChats(userId) {
    const queryResult = await db.query(
      'SELECT title, is_private, conversation_id, creator_id ' +
      'FROM "participant" INNER JOIN "conversation" ' +
      'on conversation.id = participant.conversation_id ' +
      'AND user_id=$1', [userId]
    )

    return queryResult.rows;
  }
}

module.exports = ConversationEntity;