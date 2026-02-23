import { BaseId } from '@shared/value-objects/base-id.vo';
import { Types } from 'mongoose';

export class ProjectId extends BaseId {
  private constructor(value: string | Types.ObjectId) {
    super(value);
  }

  static create(value: string | Types.ObjectId): ProjectId {
    return new ProjectId(value);
  }
}
