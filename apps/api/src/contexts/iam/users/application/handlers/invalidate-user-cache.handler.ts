import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserModifiedEvent } from '../events/user-modified.event';
import { CacheService } from '@shared/services/cache.service';
import { LoggerService } from '@shared/logging/logger.service';

@EventsHandler(UserModifiedEvent)
export class InvalidateUserCacheHandler implements IEventHandler<UserModifiedEvent> {
  constructor(
    private readonly cacheService: CacheService,
    private readonly logger: LoggerService,
  ) {}

  async handle(event: UserModifiedEvent): Promise<void> {
    this.logger.log(
      `Invalidating cache for user ${event.userId.toString()} due to ${event.action}`,
      InvalidateUserCacheHandler.name,
    );

    // Invalidate list caches
    await this.cacheService.deleteByPattern('users:all:*');

    // Invalidate specific user cache (if applicable logic exists for caching by ID)
    // Assuming GetUserById caches with a specific key pattern if implemented
    // Based on previous GetUsersHandler, it caches lists.
    // If GetUserById also caches, we should clear it.
    // Let's assume a pattern like users:id:{id} for now or just clear all user related

    // For now, clearing all users listing is crucial.
  }
}
