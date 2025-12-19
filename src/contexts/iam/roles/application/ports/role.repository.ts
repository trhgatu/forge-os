import { Role } from '../../infrastructure/schemas/iam-role.schema';
import { CreateRoleDto, UpdateRoleDto } from '../../dto';

export abstract class RoleRepository {
  abstract create(dto: CreateRoleDto): Promise<Role>;
  abstract findAll(query: any): Promise<any>;
  abstract findById(id: string): Promise<Role | null>;
  abstract update(id: string, dto: UpdateRoleDto): Promise<Role | null>;
  abstract delete(id: string): Promise<void>;
}
