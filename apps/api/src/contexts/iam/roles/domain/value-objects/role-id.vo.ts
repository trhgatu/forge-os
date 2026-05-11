import { BaseId } from '@shared/value-objects/base-id.vo';
import { v4 as uuid } from 'uuid';

export class RoleId extends BaseId {
  private constructor(id: string) {
    super(id);
  }

  static create(id?: string): RoleId {
    return new RoleId(id ?? uuid());
  }
}
