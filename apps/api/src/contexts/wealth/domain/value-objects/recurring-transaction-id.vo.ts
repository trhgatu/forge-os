import { BaseId } from '@shared/value-objects/base-id.vo';
import { v4 as uuid } from 'uuid';

export class RecurringTransactionId extends BaseId {
  private constructor(id: string) {
    super(id);
  }

  static create(id?: string): RecurringTransactionId {
    return new RecurringTransactionId(id ?? uuid());
  }

  static fromString(id: string): RecurringTransactionId {
    return new RecurringTransactionId(id);
  }

  static random(): RecurringTransactionId {
    return new RecurringTransactionId(uuid());
  }
}
