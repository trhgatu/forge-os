import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { JournalModifiedEvent } from '../events/journal-modified.event';
import { CacheService } from '@shared/services/cache.service';

@EventsHandler(JournalModifiedEvent)
export class InvalidateJournalCacheHandler
  implements IEventHandler<JournalModifiedEvent>
{
  constructor(private readonly cacheService: CacheService) {}

  async handle(event: JournalModifiedEvent): Promise<void> {
    console.log('🔥 JournalModifiedEvent received:', event);
    await this.cacheService.deleteByPattern('memories:all:*');
    await this.cacheService.deleteByPattern('memories:public:*');
    await this.cacheService.deleteByPattern(`memories:id:${event.journalId}`);
  }
}
