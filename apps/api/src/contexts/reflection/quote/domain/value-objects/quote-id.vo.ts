import { BaseId } from '@shared/domain/value-objects/base-id.vo';
export class QuoteId extends BaseId {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): QuoteId {
    return new QuoteId(value);
  }

  public static random(): QuoteId {
    const hex = '0123456789abcdef';
    let result = '';
    for (let i = 0; i < 24; i++) {
      result += hex.charAt(Math.floor(Math.random() * hex.length));
    }
    return new QuoteId(result);
  }

  protected validate(value: string): void {
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;

    if (!objectIdRegex.test(value)) {
      throw new Error(`INVALID_QUOTE_ID_FORMAT: ${value}. Expected 24-char hex string.`);
    }
  }
}
