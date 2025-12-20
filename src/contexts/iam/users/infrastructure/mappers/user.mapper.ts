import { User } from '../../domain/user.entity';
import { UserId } from '../../domain/value-objects/user-id.vo';
import { UserDocument } from '../schemas/iam-user.schema';
import { Types } from 'mongoose';

export class UserMapper {
  static toDomain(doc: UserDocument): User {
    return User.reconstitute({
      id: UserId.create(doc._id.toString()),
      name: doc.name,
      email: doc.email,
      password: doc.password,
      roleId: doc.roleId.toString(),
      role:
        doc.roleId && typeof doc.roleId === 'object' && 'name' in doc.roleId
          ? {
              id: (doc.roleId as any)._id.toString(),
              name: (doc.roleId as any).name,
              permissions:
                (doc.roleId as any).permissions?.map(
                  (p: any) => p.slug || p.toString(),
                ) || [],
            }
          : undefined,
      refreshToken: doc.refreshToken,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  static toPersistence(entity: User): Partial<UserDocument> {
    return {
      _id: new Types.ObjectId(entity.id.toString()),
      name: entity.name,
      email: entity.email,
      password: entity.password,
      roleId: new Types.ObjectId(entity.roleId),
      refreshToken: entity.refreshToken,
    };
  }
}
