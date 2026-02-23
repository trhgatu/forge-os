import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetRolesQuery } from '../queries';
import { RoleRepository } from '../ports/role.repository';
import { CacheService } from '@shared/services/cache.service';

@QueryHandler(GetRolesQuery)
export class GetRolesHandler implements IQueryHandler<GetRolesQuery> {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly cacheService: CacheService,
  ) {}

  async execute(query: GetRolesQuery) {
    const { dto } = query;
    const { page = 1, limit = 10, keyword, isDeleted } = dto;
    const cacheKey = `roles:all:${keyword || 'all'}:p${page}:l${limit}:${isDeleted || 'false'}`;

    const cached = await this.cacheService.get(cacheKey);
    if (cached) return cached;

    const result = await this.roleRepository.findAll(dto);
    await this.cacheService.set(cacheKey, result, 60);

    return result;
  }
}
