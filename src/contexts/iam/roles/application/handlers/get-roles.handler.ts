import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetRolesQuery } from '../queries';
import { RoleRepository } from '../ports/role.repository';

@QueryHandler(GetRolesQuery)
export class GetRolesHandler implements IQueryHandler<GetRolesQuery> {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(query: GetRolesQuery) {
    return this.roleRepository.findAll(query.dto);
  }
}
