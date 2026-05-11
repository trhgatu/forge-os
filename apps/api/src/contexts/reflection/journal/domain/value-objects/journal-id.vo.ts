import { BaseId } from '@shared/value-objects/base-id.vo';
import { v4 as uuid } from 'uuid';

export class JournalId extends BaseId {
  private constructor(id: string) {
    super(id);
  }

  static create(id?: string): JournalId {
    return new JournalId(id ?? uuid());
  }

  static fromString(id: string): JournalId {
    return new JournalId(id);
  }

  static random(): JournalId {
    return new JournalId(uuid());
  }
}
