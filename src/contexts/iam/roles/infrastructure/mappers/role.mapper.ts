import { Role } from '../../domain/role.entity';
import { RoleId } from '../../domain/value-objects/role-id.vo';
import { RoleDocument } from '../../infrastructure/schemas/iam-role.schema';
import { Types } from 'mongoose';

export class RoleMapper {
  static toDomain(doc: RoleDocument): Role {
    return Role.reconstitute({
      id: RoleId.create(doc._id as Types.ObjectId),
      name: doc.name,
      description: doc.description,
      permissions: doc.permissions.map((p) => p.toString()),
      isSystem: doc.isSystem,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  static toPersistence(entity: Role): any {
    return {
      _id: new Types.ObjectId(entity.id.toString()),
      name: entity.name,
      description: entity.description,
      permissions: entity.permissions.map((p) => new Types.ObjectId(p)),
      isSystem: entity.isSystem,
      updatedAt: entity.updatedAt,
    };
  }
}
