const {v4: uuidv4} = require("uuid");
const db = require("../dbconfing/db-conntector");

class UserEntity {
  static async insertUser(username, name, password) {
    const uuid = uuidv4();
    const date = new Date().toISOString();
    const idOnline = false;

    const queryResult =
      await db.query('INSERT INTO "user" ' +
        '(id, username, name, password, is_online, created_at, updated_at) ' +
        'VALUES($1, $2, $3, $4, $5, $6, $6);',
      [uuid, username, name, password, idOnline, date]);

    return queryResult;
  }

  static async deleteByUsername(username) {
    const queryResult = await db.query('DELETE FROM "user" WHERE username=$1', [username]);

    return queryResult;
  }

  static async findByUsername(username) {
    const queryResult = await db.query('SELECT * FROM "user" WHERE username=$1', [username]);
    return queryResult.rows[0];
  }
}

module.exports = UserEntity;