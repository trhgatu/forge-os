import { BaseId } from '@shared/value-objects';
import { Types } from 'mongoose';

export class RoleId extends BaseId {
  private constructor(id: string | Types.ObjectId) {
    super(id);
  }

  static create(id?: string | Types.ObjectId): RoleId {
    return new RoleId(id ?? new Types.ObjectId());
  }
}
