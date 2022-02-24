const db = require('../dbconfing/db-conntector');

class ContactEntity {
  static async addContact(userId, contactId) {
    const date = new Date().toISOString();

    const queryResult = await db.query(`
        INSERT INTO "contact" (user_id, contact_id, created_at) 
        VALUES($1, $2, $3);
        `,
      [userId, contactId, date],
    );

    return queryResult;
  }

  static async getContact(userId, contactId) {
    const queryResult = await db.query(`
        SELECT * FROM "contact" 
        WHERE user_id=$1 
          AND contact_id=$2;
        `,
      [userId, contactId],
    );

    return queryResult.rows[0];
  }

  static async getAllContacts(userId) {
    const queryResult = await db.query(`
        SELECT id, name, username, last_visit_at AS "lastVisitAt", is_online AS "isOnline" 
        FROM "contact" INNER JOIN "user" on contact.contact_id = "user".id
        WHERE user_id=$1;
        `,
      [userId]);

    return queryResult.rows;
  }

  static async removeContact(userId, contactId) {
    const queryResult = await db.query(
      'DELETE FROM "contact" WHERE user_id=$1 AND contact_id=$2;',
      [userId, contactId],
    );

    return queryResult;
  }
}

module.exports = ContactEntity;
