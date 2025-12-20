import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPermissionsQuery } from '../queries';
import { PermissionRepository } from '../ports/permission.repository';

@QueryHandler(GetPermissionsQuery)
export class GetPermissionsHandler
  implements IQueryHandler<GetPermissionsQuery>
{
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async execute(query: GetPermissionsQuery) {
    return this.permissionRepository.findAll(query.dto);
  }
}
