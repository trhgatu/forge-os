import { BaseId } from '@shared/value-objects';
import { Types } from 'mongoose';

export class QuoteId extends BaseId {
  private constructor(value: string | Types.ObjectId) {
    super(value);
  }

  public static create(value: string | Types.ObjectId): QuoteId {
    return new QuoteId(value);
  }

  public static random(): QuoteId {
    return new QuoteId(new Types.ObjectId());
  }
}
