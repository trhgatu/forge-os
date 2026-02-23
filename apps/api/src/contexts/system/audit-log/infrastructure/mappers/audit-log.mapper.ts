import { AuditLog } from '../../domain/audit-log.entity';
import { AuditLogId } from '../../domain/value-objects/audit-log-id.vo';
import { AuditLogDocument } from '../schemas/sys-audit-log.schema';
import { Types } from 'mongoose';

export class AuditLogMapper {
  static toDomain(doc: AuditLogDocument): AuditLog {
    return AuditLog.reconstitute({
      id: AuditLogId.create(doc._id as Types.ObjectId),
      action: doc.action,
      method: doc.method,
      statusCode: doc.statusCode,
      userId: AuditLogMapper.extractUserId(doc.user),
      path: doc.path,
      params: doc.params,
      query: doc.query,
      body: doc.body,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  private static extractUserId(
    user: Types.ObjectId | { _id: Types.ObjectId } | undefined | null,
  ): string {
    if (!user) return ''; // Should not happen if required in schema
    if (user instanceof Types.ObjectId) return user.toString();
    if ('_id' in user && user._id instanceof Types.ObjectId) {
      return user._id.toString();
    }
    return user.toString();
  }

  static toPersistence(entity: AuditLog): Partial<AuditLogDocument> {
    return {
      _id: new Types.ObjectId(entity.id.toString()),
      action: entity.action,
      method: entity.method,
      statusCode: entity.statusCode,
      user: new Types.ObjectId(entity.userId),
      path: entity.path,
      params: entity.params,
      query: entity.query,
      body: entity.body,
    };
  }
}
