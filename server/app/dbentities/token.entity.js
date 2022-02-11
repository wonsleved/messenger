const db = require('../dbconfing/db-conntector');

class TokenEntity {
  static async insertRefreshToken(userId, refreshToken) {
    const queryResult = await db.query(
      'INSERT INTO "token" (user_id, refresh_token) ' + 'VALUES($1, $2);',
      [userId, refreshToken],
    );

    return queryResult;
  }

  static async updateRefreshToken(userId, refreshToken) {
    const queryResult = await db.query('UPDATE "token" SET refresh_token=$1 WHERE user_id=$2;', [
      refreshToken,
      userId,
    ]);

    return queryResult;
  }

  static async deleteRefreshToken(refreshToken) {
    const queryResult = await db.query('DELETE FROM "token" WHERE refresh_token=$1;', [
      refreshToken,
    ]);

    return queryResult.rows[0];
  }

  static async selectByRefreshToken(refreshToken) {
    const queryResult = await db.query('SELECT * FROM "token" WHERE refresh_token=$1;', [
      refreshToken,
    ]);

    return queryResult.rows[0];
  }

  static async selectByUserId(userId) {
    const queryResult = await db.query('SELECT * FROM "token" WHERE user_id=$1;', [userId]);

    return queryResult.rows[0];
  }
}

module.exports = TokenEntity;
