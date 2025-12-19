import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUsersQuery, GetUserByIdQuery } from '../index';
import { UserRepository } from '../../ports/user.repository';
import { CacheService } from '@shared/services/cache.service';
import { UserNotFoundException } from '../../../domain/exceptions/user-not-found.exception';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cacheService: CacheService,
  ) { }

  async execute(query: GetUsersQuery) {
    const { dto } = query;
    // Cache logic should ideally be in a decorator or here
    // Reusing logic from UserService
    const { page = 1, limit = 10, keyword } = dto;
    const cacheKey = `users:all:${keyword || 'all'}:p${page}:l${limit}`;

    // Note: To properly implement caching, we need access to CacheService.
    // UserService had CacheService injected.
    // I can stick to the same pattern.

    const cached = await this.cacheService.get(cacheKey);
    if (cached) return cached;

    const result = await this.userRepository.findAll(dto);
    await this.cacheService.set(cacheKey, result, 60);

    return result;
  }
}

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(query: GetUserByIdQuery) {
    const { id } = query;
    const user = await this.userRepository.findById(id);
    if (!user) throw new UserNotFoundException({ id });
    return user;
  }
}
