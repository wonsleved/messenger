const { UNAUTHORIZED_ERROR } = require('./api.errors');

class ApiException extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static unauthorized() {
    return new ApiException(401, UNAUTHORIZED_ERROR);
  }

  static badRequest(message, errors = []) {
    return new ApiException(400, message, errors);
  }
}

module.exports = ApiException;
