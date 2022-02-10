const db = require('../dbconfing/db-conntector');
const bcrypt = require('bcrypt');
const UserEntity = require('../dbentities/user.entity');
const UserDto = require('../dtos/user.dto');
const TokenEntity = require('../dbentities/token.entity');
const TokenService = require('./token.service');

class AuthService {
  static async register(username, name, password) {
    // check if exists
    let userDataQueryResult = await UserEntity.findByUsername(username);
    if (userDataQueryResult) throw new Error('User already exists!');

    //  create new user
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT));
    await UserEntity.insertUser(username, name, hashedPassword);
    userDataQueryResult = await UserEntity.findByUsername(username);

    //  generate Tokens
    const userData = new UserDto(userDataQueryResult);
    const tokens = TokenService.generateTokens({ ...userData });

    //  insert refresh token in db
    await TokenService.saveRefreshToken(userData.id, tokens.refreshToken);

    return { user: userData, ...tokens };
  }

  static async login(username, password) {
    //  check if exists
    let userDataQueryResult = await UserEntity.findByUsername(username);
    if (!userDataQueryResult) throw new Error('User does not exists!');

    //  compare passwords
    const isPasswordCorrect = await bcrypt.compare(password, userDataQueryResult.password);
    if (!isPasswordCorrect) throw new Error('Wrong password');

    //  generate Tokens
    const userData = new UserDto(userDataQueryResult);
    const tokens = TokenService.generateTokens({ ...userData });

    //  insert refresh token in db
    await TokenService.saveRefreshToken(userData.id, tokens.refreshToken);

    return { user: userData, ...tokens };
  }

  static async delete(username) {
    //  check if user exists
    let userDataQueryResult = await UserEntity.findByUsername(username);
    if (!userDataQueryResult) throw new Error('User does not exist!');

    //  get refresh token from db
    const tokenData = await TokenEntity.selectByUserId(userDataQueryResult.id);

    //  delete all from db

    if (tokenData) await TokenService.removeToken(tokenData.refresh_token);

    await UserEntity.deleteByUsername(username);

    return userDataQueryResult;
  }

  static async logout(refreshToken) {
    //  check for refresh token
    if (!refreshToken) throw new Error('Not authorized');

    //  remove token from db
    const userDataFromToken = await TokenService.removeToken(refreshToken);

    //  check if refresh token is corrupted
    if (!userDataFromToken) throw new Error('Wrong refresh token');

    const userId = userDataFromToken.user_id;

    return { userId, refreshToken };
  }

  static async refresh(refreshToken) {
    if (!refreshToken) throw new Error('Not authorized');

    //  compare tokens from cookie and db
    const userDataFromToken = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await TokenService.findToken(refreshToken);
    if (!userDataFromToken || !tokenFromDb) throw new Error('Not authorized');

    //  get actual data from db
    let userDataQueryResult = await UserEntity.findByUsername(userDataFromToken.username);

    //  generate Tokens
    const userData = new UserDto(userDataQueryResult);
    const tokens = TokenService.generateTokens({ ...userData });

    //  insert refresh token in db
    await TokenService.saveRefreshToken(userData.id, tokens.refreshToken);

    return { user: userData, ...tokens };
  }

  static async getAllUsers() {
    const query = await db.query('SELECT * FROM "user"');
    return query.rows;
  }
}

module.exports = AuthService;
