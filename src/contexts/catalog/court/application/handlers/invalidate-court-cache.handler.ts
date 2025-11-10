import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CourtModifiedEvent } from '../events/court-modified.event';
import { CacheService } from '@shared/services/cache.service';

@EventsHandler(CourtModifiedEvent)
export class InvalidateCourtCacheHandler
  implements IEventHandler<CourtModifiedEvent>
{
  constructor(private readonly cacheService: CacheService) {}

  async handle(event: CourtModifiedEvent): Promise<void> {
    console.log('🔥 CourtModifiedEvent received:', event);
    await this.cacheService.deleteByPattern('courts:all:*');
    await this.cacheService.deleteByPattern('courts:public:*');
    await this.cacheService.deleteByPattern(`courts:id:${event.courtId}`);
  }
}
