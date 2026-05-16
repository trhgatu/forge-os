import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { JournalModifiedEvent } from '../journal-modified.event';
import { CacheService } from '@shared/services';
import { Logger } from '@nestjs/common';

@EventsHandler(JournalModifiedEvent)
export class InvalidateJournalCacheHandler implements IEventHandler<JournalModifiedEvent> {
  private readonly logger = new Logger(InvalidateJournalCacheHandler.name);

  constructor(private readonly cacheService: CacheService) {}

  async handle(event: JournalModifiedEvent): Promise<void> {
    this.logger.log(`Invalidating cache for journal: ${event.id.value}`);

    await this.cacheService.deleteByPattern('journals:*');
  }
}
