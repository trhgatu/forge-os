import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPermissionsQuery } from '../queries';
import { PermissionRepository } from '../ports/permission.repository';
import { CacheService } from '@shared/services/cache.service';

@QueryHandler(GetPermissionsQuery)
export class GetPermissionsHandler
  implements IQueryHandler<GetPermissionsQuery>
{
  constructor(
    private readonly permissionRepository: PermissionRepository,
    private readonly cacheService: CacheService,
  ) {}

  async execute(query: GetPermissionsQuery) {
    const { dto } = query;
    const { page = 1, limit = 10, keyword } = dto;
    const cacheKey = `permissions:all:${keyword || 'all'}:p${page}:l${limit}`;

    const cached = await this.cacheService.get(cacheKey);
    if (cached) return cached;

    const result = await this.permissionRepository.findAll(dto);
    await this.cacheService.set(cacheKey, result, 60);

    return result;
  }
}
