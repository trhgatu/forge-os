import { BaseId } from '@shared/value-objects/base-id.vo';
import { v4 as uuid } from 'uuid';

export class QuoteId extends BaseId {
  private constructor(id: string) {
    super(id);
  }

  static create(id?: string): QuoteId {
    return new QuoteId(id ?? uuid());
  }

  static random(): QuoteId {
    return new QuoteId(uuid());
  }
}
