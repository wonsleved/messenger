const jwt = require('jsonwebtoken');
const db = require('../dbconfing/db-conntector');
const TokenEntity = require('../dbentities/token.entity');

class TokenService {
  static generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });

    return { accessToken, refreshToken };
  }

  static validateRefreshToken(token) {
    // add try catch
    const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    return userData;
  }

  static validateAccessToken(token) {
    // add try catch
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return userData;
  }

  static async saveRefreshToken(userId, refreshToken) {
    // add try catch
    let tokenData = await TokenEntity.selectByUserId(userId);

    if (tokenData) {
      await TokenEntity.updateRefreshToken(userId, refreshToken);
    } else {
      await TokenEntity.insertRefreshToken(userId, refreshToken);
    }

    tokenData = await TokenEntity.selectByRefreshToken(refreshToken);

    return tokenData;
  }

  static async findToken(refreshToken) {
    let tokenData = await TokenEntity.selectByRefreshToken(refreshToken);
    return tokenData;
  }

  static async removeToken(refreshToken) {
    let tokenData = await TokenEntity.selectByRefreshToken(refreshToken);
    await TokenEntity.deleteRefreshToken(refreshToken);

    return tokenData;
  }

  static async deleteTokenByUserId(userId) {
    let tokenData = await TokenEntity.selectByUserId(userId);
    if (tokenData) await TokenEntity.deleteRefreshToken(tokenData.refreshToken);

    return tokenData;
  }
}

module.exports = TokenService;
