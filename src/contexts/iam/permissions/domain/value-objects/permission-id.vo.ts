import { BaseId } from '@shared/value-objects';
import { Types } from 'mongoose';

export class PermissionId extends BaseId {
  private constructor(id: string | Types.ObjectId) {
    super(id);
  }

  static create(id?: string | Types.ObjectId): PermissionId {
    return new PermissionId(id || new Types.ObjectId());
  }
}
