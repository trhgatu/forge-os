export interface MongoError {
  code: number;
  [key: string]: any;
}

export class MongoErrorUtils {
  static isDuplicateKeyError(error: unknown): boolean {
    return (
      error !== null &&
      typeof error === 'object' &&
      'code' in error &&
      (error as MongoError).code === 11000
    );
  }
}
