export abstract class BaseDomainException extends Error {
  constructor(
    public readonly message: string,
    public readonly errorCode: string,
    public readonly statusCode: number,
    public readonly metadata?: Record<string, any>,
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
