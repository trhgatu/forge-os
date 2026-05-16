import { Permission } from '../../domain/permission.entity';
import { PermissionId } from '../../domain/value-objects/permission-id.vo';

export class PermissionMapper {
  static toDomain(doc: any): Permission {
    const id = doc.id;

    return Permission.reconstitute({
      id: PermissionId.create(id),
      name: doc.name,
      description: doc.description,
      resource: doc.resource,
      action: doc.action,
      isDeleted: doc.isDeleted,
      deletedAt: doc.deletedAt,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  static toPersistence(entity: Permission): any {
    return {
      id: entity.id.toString(),
      name: entity.name,
      description: entity.description,
      resource: entity.resource,
      action: entity.action,
      isDeleted: entity.isDeleted,
      deletedAt: entity.deletedAt,
      updatedAt: entity.updatedAt,
    };
  }
}
