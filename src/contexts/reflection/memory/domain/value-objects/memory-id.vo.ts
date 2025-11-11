import { BaseId } from '@shared/value-objects';
import { Types } from 'mongoose';

export class MemoryId extends BaseId {
  private constructor(value: string | Types.ObjectId) {
    super(value);
  }

  public static create(value: string | Types.ObjectId): MemoryId {
    return new MemoryId(value);
  }
}
