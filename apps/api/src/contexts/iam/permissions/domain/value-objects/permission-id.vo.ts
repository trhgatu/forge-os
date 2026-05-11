import { BaseId } from '@shared/value-objects/base-id.vo';
import { v4 as uuid } from 'uuid';

export class PermissionId extends BaseId {
  private constructor(id: string) {
    super(id);
  }

  static create(id?: string): PermissionId {
    return new PermissionId(id ?? uuid());
  }
}
