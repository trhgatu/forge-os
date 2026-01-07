import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { JournalModifiedEvent } from '../events/journal-modified.event';
import { CacheService } from '@shared/services/cache.service';
import { LoggerService } from '@shared/logging/logger.service';

@EventsHandler(JournalModifiedEvent)
export class InvalidateJournalCacheHandler
  implements IEventHandler<JournalModifiedEvent>
{
  constructor(
    private readonly cacheService: CacheService,
    private readonly logger: LoggerService,
  ) {}

  async handle(event: JournalModifiedEvent): Promise<void> {
    this.logger.log(
      `Journal modified event received: ${event.journalId}`,
      'InvalidateJournalCacheHandler',
    );
    await this.cacheService.deleteByPattern('memories:all:*');
    await this.cacheService.deleteByPattern('memories:public:*');
    await this.cacheService.deleteByPattern(`memories:id:${event.journalId}`);
  }
}
