import { BaseId } from '@shared/value-objects/base-id.vo';
import { v4 as uuid } from 'uuid';

export class CardId extends BaseId {
  private constructor(id: string) {
    super(id);
  }

  static create(id?: string): CardId {
    return new CardId(id ?? uuid());
  }

  static fromString(id: string): CardId {
    return new CardId(id);
  }

  static random(): CardId {
    return new CardId(uuid());
  }
}
