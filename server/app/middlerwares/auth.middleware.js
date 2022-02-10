const ApiException = require('../exceptions/api.exception');
const TokenService = require('../services/token.service');
const UserEntity = require('../dbentities/user.entity');

module.exports = () =>
  async function (req, res, next) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) throw ApiException.unauthorized();

      const accessToken = authHeader.split(' ')[1];
      if (!accessToken) throw ApiException.unauthorized();

      const userDataFromToken = TokenService.validateAccessToken(accessToken);
      if (!userDataFromToken) throw ApiException.unauthorized();

      const userDataQueryResult = await UserEntity.findByUsername(userDataFromToken.username);
      if (!userDataQueryResult) throw ApiException.unauthorized();

      req.user = userDataFromToken;
      next();
    } catch (e) {
      return next(e);
    }
  };
