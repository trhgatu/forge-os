import { validate as validateUuid } from 'uuid';
import { BaseId } from '@shared/domain/value-objects/base-id.vo';

export class QuoteId extends BaseId {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): QuoteId {
    return new QuoteId(value);
  }

  public static random(): QuoteId {
    return new QuoteId(crypto.randomUUID());
  }

  protected validate(value: string): void {
    super.validate(value);
    if (!validateUuid(value)) {
      throw new Error(`INVALID_QUOTE_ID_FORMAT: ${value}`);
    }
  }
}
