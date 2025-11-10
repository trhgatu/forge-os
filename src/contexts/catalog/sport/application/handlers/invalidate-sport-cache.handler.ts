import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SportModifiedEvent } from '../events/sport-modified.event';
import { CacheService } from '@shared/services/cache.service';

@EventsHandler(SportModifiedEvent)
export class InvalidateSportCacheHandler
  implements IEventHandler<SportModifiedEvent>
{
  constructor(private readonly cacheService: CacheService) {}

  async handle(event: SportModifiedEvent): Promise<void> {
    console.log('🔥 SportModifiedEvent received:', event);
    await this.cacheService.deleteByPattern('sports:all:*');
    await this.cacheService.deleteByPattern('sports:public:*');
    await this.cacheService.deleteByPattern(`sports:id:${event.sportId}`);
  }
}
