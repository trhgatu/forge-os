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
      createdAt: (doc as any).createdAt,
      updatedAt: (doc as any).updatedAt,
    });
  }

  static toPersistence(entity: Permission): any {
    return {
      _id: new Types.ObjectId(entity.id.toString()),
      name: entity.name,
      description: entity.description,
      resource: entity.resource,
      action: entity.action,
      updatedAt: entity.updatedAt,
    };
  }
}
