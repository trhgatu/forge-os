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
      `Invalidating cache for journal: ${event.journalId.toString()}`,
      InvalidateJournalCacheHandler.name,
    );
    await this.cacheService.deleteByPattern(
      JournalCacheKeys.ALL_JOURNALS_PATTERN,
    );
    await this.cacheService.deleteByPattern(
      JournalCacheKeys.PUBLIC_JOURNALS_PATTERN,
    );
    await this.cacheService.deleteByPattern(
      JournalCacheKeys.GET_BY_ID(event.journalId),
    );
  }
}
