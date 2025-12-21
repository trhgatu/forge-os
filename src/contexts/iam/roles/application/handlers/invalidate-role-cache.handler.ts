import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { RoleModifiedEvent } from '../events/role-modified.event';
import { CacheService } from '@shared/services/cache.service';
import { LoggerService } from '@shared/logging/logger.service';

@EventsHandler(RoleModifiedEvent)
export class InvalidateRoleCacheHandler
  implements IEventHandler<RoleModifiedEvent>
{
  constructor(
    private readonly cacheService: CacheService,
    private readonly logger: LoggerService,
  ) {}

  async handle(event: RoleModifiedEvent): Promise<void> {
    this.logger.log(
      `Invalidating cache for role ${event.roleId.toString()} due to ${event.action}`,
      InvalidateRoleCacheHandler.name,
    );

    // Invalidate list caches
    await this.cacheService.deleteByPattern('roles:all:*');

    // Invalidate specific role cache
    // Assuming we will cache by ID with pattern roles:id:{id}
    await this.cacheService.deleteByPattern(
      `roles:id:${event.roleId.toString()}`,
    );
  }
}
