import { BaseId } from '@shared/value-objects/base-id.vo';
import { v4 as uuid } from 'uuid';

export class AuditLogId extends BaseId {
  private constructor(id: string) {
    super(id);
  }

  static create(id?: string): AuditLogId {
    return new AuditLogId(id ?? uuid());
  }
}
