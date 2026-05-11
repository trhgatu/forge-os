import { AuditLog } from '../../domain/audit-log.entity';

export class AuditLogMapper {
  static toDomain(doc: any): AuditLog | null {
    if (!doc) return null;

    return AuditLog.createFromPersistence(
      {
        action: doc.action,
        method: doc.method,
        statusCode: doc.statusCode,
        userId: doc.userId,
        path: doc.path,
        params: doc.params,
        query: doc.query,
        body: doc.body,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
      },
      doc.id,
    );
  }

  static toPersistence(entity: AuditLog): any {
    const props = entity.toPersistence();
    return {
      id: entity.id.value,
      action: props.action,
      method: props.method,
      statusCode: props.statusCode,
      userId: props.userId,
      path: props.path,
      params: props.params,
      query: props.query,
      body: props.body,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    };
  }
}
