import { Permission } from '../../domain/permission.entity';
import { PermissionId } from '../../domain/value-objects/permission-id.vo';
import { PermissionDocument } from '../../infrastructure/schemas/iam-permission.schema';
import { Types } from 'mongoose';

export class PermissionMapper {
  static toDomain(doc: PermissionDocument): Permission {
    return Permission.reconstitute({
      id: PermissionId.create(doc._id as Types.ObjectId),
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

  static toPersistence(entity: Permission): Partial<PermissionDocument> {
    return {
      _id: new Types.ObjectId(entity.id.toString()),
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
