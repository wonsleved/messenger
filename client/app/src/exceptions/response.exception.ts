export class ResponseException extends Error {
  public readonly status;
  public readonly errors;

  constructor(status: number, message: string, errors: any) {
    super(message);
    this.status = status;

    if (typeof(errors) === 'object' && errors.errors)
      errors = errors.errors;

    this.errors = errors;
  }
}