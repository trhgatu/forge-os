import { BaseId } from '@shared/value-objects';
import { Types } from 'mongoose';

export class JournalId extends BaseId {
  private constructor(value: string | Types.ObjectId) {
    super(value);
  }

  public static create(value: string | Types.ObjectId): JournalId {
    return new JournalId(value);
  }

  public static random(): JournalId {
    return new JournalId(new Types.ObjectId());
  }
}
