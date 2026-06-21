import { BaseId } from '@shared/value-objects/base-id.vo';
import { v4 as uuid } from 'uuid';

export class TransactionId extends BaseId {
  private constructor(id: string) {
    super(id);
  }

  static create(id?: string): TransactionId {
    return new TransactionId(id ?? uuid());
  }

  static fromString(id: string): TransactionId {
    return new TransactionId(id);
  }

  static random(): TransactionId {
    return new TransactionId(uuid());
  }
}
