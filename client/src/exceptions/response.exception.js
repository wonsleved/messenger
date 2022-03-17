export class ResponseException extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;

    if (typeof(errors) === 'object' && errors.errors)
      errors = errors.errors;

    this.errors = errors;
  }
}