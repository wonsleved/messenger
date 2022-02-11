const ApiException = require('../exceptions/api.exception');
const ApiErrorHandler = require('../exceptions/api.error-handler');
const { UNKNOWN_ERROR } = require('../exceptions/api.errors');

module.exports = () =>
  function (err, req, res, next) {
    ApiErrorHandler.logError(err.message);

    if (err instanceof ApiException)
      res.status(err.status).json({ message: err.message, errors: err.errors });
    else res.status(500).json({ message: UNKNOWN_ERROR });
  };
