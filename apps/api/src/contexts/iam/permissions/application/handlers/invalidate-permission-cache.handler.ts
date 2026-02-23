import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PermissionModifiedEvent } from '../events/permission-modified.event';
import { CacheService } from '@shared/services/cache.service';
import { LoggerService } from '@shared/logging/logger.service';

@EventsHandler(PermissionModifiedEvent)
export class InvalidatePermissionCacheHandler implements IEventHandler<PermissionModifiedEvent> {
  constructor(
    private readonly cacheService: CacheService,
    private readonly logger: LoggerService,
  ) {}

  async handle(event: PermissionModifiedEvent): Promise<void> {
    this.logger.log(
      `Invalidating cache for permission ${event.permissionId.toString()} due to ${event.action}`,
      InvalidatePermissionCacheHandler.name,
    );

    // Invalidate list caches
    await this.cacheService.deleteByPattern('permissions:all:*');

    // Invalidate specific permission cache
    await this.cacheService.deleteByPattern(`permissions:id:${event.permissionId.toString()}`);
  }
}
