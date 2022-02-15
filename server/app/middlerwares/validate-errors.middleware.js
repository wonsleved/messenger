const ApiException = require('../exceptions/api.exception');
const { validationResult } = require('express-validator');
const { INVALID_CREDENTIALS } = require('../exceptions/api.errors');

module.exports = () =>
  async function (req, res, next) {
    try {
      validateErrors(req);

      next();
    } catch (e) {
      return next(e);
    }
  };

function validateErrors(req) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw ApiException.badRequest(INVALID_CREDENTIALS, errors);
  }
}
