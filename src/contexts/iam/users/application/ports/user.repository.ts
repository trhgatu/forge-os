import { User } from '../../infrastructure/schemas/iam-user.schema';
import { CreateUserDto, UpdateUserDto } from '../../dto';

export abstract class UserRepository {
  abstract create(dto: CreateUserDto): Promise<User>;
  abstract findAll(query: any): Promise<any>; // Defines return type properly later
  abstract findById(id: string): Promise<User | null>;
  abstract findByIdWithRoleAndPermissions(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract update(id: string, dto: UpdateUserDto): Promise<User | null>;
  abstract updateRefreshToken(
    id: string,
    refreshToken: string | null,
  ): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
