import { Types } from 'mongoose';

export class AuditLogId {
  constructor(private readonly value: string) {
    if (!value) {
      throw new Error('AuditLogId cannot be empty');
    }
  }

  static create(value?: string | Types.ObjectId): AuditLogId {
    if (!value) {
      return new AuditLogId(new Types.ObjectId().toString());
    }
    return new AuditLogId(value.toString());
  }

  toString(): string {
    return this.value;
  }

  equals(other: AuditLogId): boolean {
    return this.value === other.value;
  }
}
