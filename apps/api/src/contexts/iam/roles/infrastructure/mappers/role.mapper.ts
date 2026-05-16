import { Role } from '../../domain/role.entity';
import { RoleId } from '../../domain/value-objects/role-id.vo';

export class RoleMapper {
  static toDomain(doc: any): Role {
    const id = doc.id;
    const permissions = Array.isArray(doc.permissions)
      ? doc.permissions.map((p: any) => (p.id || p).toString())
      : [];

    return Role.reconstitute({
      id: RoleId.create(id),
      name: doc.name,
      description: doc.description,
      permissions,
      isSystem: doc.isSystem,
      isDeleted: doc.isDeleted,
      deletedAt: doc.deletedAt,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  static toPersistence(entity: Role): any {
    return {
      id: entity.id.toString(),
      name: entity.name,
      description: entity.description,
      permissions: entity.permissions,
      isSystem: entity.isSystem,
      isDeleted: entity.isDeleted,
      deletedAt: entity.deletedAt,
      updatedAt: entity.updatedAt,
    };
  }
}
