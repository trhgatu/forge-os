import { User } from '../../infrastructure/schemas/iam-user.schema';
import { CreateUserDto, UpdateUserDto } from '../../dto';

import { QueryUserDto } from '../../dto';
import { PaginatedResult } from '@shared/interfaces/paginated-result.interface';

export abstract class UserRepository {
  abstract create(dto: CreateUserDto): Promise<User>;
  abstract findAll(query: QueryUserDto): Promise<PaginatedResult<User>>;
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
