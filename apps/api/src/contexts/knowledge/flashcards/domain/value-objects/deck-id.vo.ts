import { BaseId } from '@shared/value-objects/base-id.vo';
import { v4 as uuid } from 'uuid';

export class DeckId extends BaseId {
  private constructor(id: string) {
    super(id);
  }

  static create(id?: string): DeckId {
    return new DeckId(id ?? uuid());
  }

  static fromString(id: string): DeckId {
    return new DeckId(id);
  }

  static random(): DeckId {
    return new DeckId(uuid());
  }
}
