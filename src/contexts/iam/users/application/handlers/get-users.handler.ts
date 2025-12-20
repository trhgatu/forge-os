import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUsersQuery } from '../queries';
import { UserRepository } from '../ports/user.repository';
import { CacheService } from '@shared/services/cache.service';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cacheService: CacheService,
  ) {}

  async execute(query: GetUsersQuery) {
    const { dto } = query;
    const { page = 1, limit = 10, keyword, status } = dto;
    const cacheKey = `users:all:${keyword || 'all'}:${status || 'all'}:p${page}:l${limit}`;

    const cached = await this.cacheService.get(cacheKey);
    if (cached) return cached;

    const result = await this.userRepository.findAll(dto);
    await this.cacheService.set(cacheKey, result, 60);

    return result;
  }
}
