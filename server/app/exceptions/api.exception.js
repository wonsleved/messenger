const { UNAUTHORIZED_ERROR, NO_ACCESS } = require('./api.errors');

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

  static accessDenied(errors = []) {
    return new ApiException(403, NO_ACCESS, errors);
  }

  static notAllowed(message = NO_ACCESS, errors = []) {
    return new ApiException(405, message, errors);
  }

  static notFound(message, errors = []) {
    return new ApiException(404, message, errors);
  }
}

module.exports = ApiException;
