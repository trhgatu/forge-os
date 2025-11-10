// src/modules/venue/application/handlers/invalidate-venue-cache.handler.ts
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { VenueModifiedEvent } from '../events/venue-modified.event';
import { CacheService } from '@shared/services/cache.service';

@EventsHandler(VenueModifiedEvent)
export class InvalidateVenueCacheHandler
  implements IEventHandler<VenueModifiedEvent>
{
  constructor(private readonly cacheService: CacheService) {}

  async handle(event: VenueModifiedEvent): Promise<void> {
    console.log('🔥 VenueModifiedEvent received:', event);
    await this.cacheService.deleteByPattern('venues:all:*');
    await this.cacheService.deleteByPattern('venues:public:*');
    await this.cacheService.deleteByPattern(`venues:id:${event.venueId}`);
  }
}
