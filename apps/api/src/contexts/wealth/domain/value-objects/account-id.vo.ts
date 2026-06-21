import { BaseId } from '@shared/value-objects/base-id.vo';
import { v4 as uuid } from 'uuid';

export class AccountId extends BaseId {
  private constructor(id: string) {
    super(id);
  }

  static create(id?: string): AccountId {
    return new AccountId(id ?? uuid());
  }

  static fromString(id: string): AccountId {
    return new AccountId(id);
  }

  static random(): AccountId {
    return new AccountId(uuid());
  }
}
