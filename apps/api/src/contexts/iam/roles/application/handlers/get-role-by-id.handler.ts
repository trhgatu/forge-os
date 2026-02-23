import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetRoleByIdQuery } from '../queries';
import { RoleRepository } from '../ports/role.repository';
import { RoleNotFoundException } from 'src/contexts/iam/auth/domain/exceptions/iam.exceptions';

@QueryHandler(GetRoleByIdQuery)
export class GetRoleByIdHandler implements IQueryHandler<GetRoleByIdQuery> {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(query: GetRoleByIdQuery) {
    const role = await this.roleRepository.findById(query.id);
    if (!role) throw new RoleNotFoundException({ id: query.id });
    return role;
  }
}
