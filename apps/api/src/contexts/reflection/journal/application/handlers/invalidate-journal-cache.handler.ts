import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { JournalModifiedEvent } from '../events/journal-modified.event';
import { CacheService } from '@shared/services/cache.service';
import { LoggerService } from '@shared/logging/logger.service';
import { JournalCacheKeys } from '../../infrastructure/cache/journal-cache.keys';

@EventsHandler(JournalModifiedEvent)
export class InvalidateJournalCacheHandler implements IEventHandler<JournalModifiedEvent> {
  constructor(
    private readonly cacheService: CacheService,
    private readonly logger: LoggerService,
  ) {}

  async handle(event: JournalModifiedEvent): Promise<void> {
    this.logger.log(
      `Handling cache invalidation for journal: ${event.journalId.toString()} (Action: ${event.action})`,
      InvalidateJournalCacheHandler.name,
    );
    await this.cacheService.incrementVersion('journals');

    const specificKey = JournalCacheKeys.GET_BY_ID(event.journalId);
    await this.cacheService.delete(specificKey);

    this.logger.log(
      `Version incremented and specific cache deleted: ${specificKey}`,
      InvalidateJournalCacheHandler.name,
    );
  }
}
