import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { QuoteModifiedEvent } from '../quote-modified.event';
import { CacheService } from '@shared/services/cache.service';
import { LoggerService } from '@shared/logging/logger.service';
import { QuoteCacheKeys } from '../../../infrastructure/cache';

@EventsHandler(QuoteModifiedEvent)
export class InvalidateQuoteCacheHandler implements IEventHandler<QuoteModifiedEvent> {
  constructor(
    private readonly cacheService: CacheService,
    private readonly logger: LoggerService,
  ) {}

  async handle(event: QuoteModifiedEvent): Promise<void> {
    this.logger.log(
      `Invalidating cache for quote: ${event.quoteId.toString()}`,
      InvalidateQuoteCacheHandler.name,
    );
    await this.cacheService.deleteByPattern(QuoteCacheKeys.ALL_QUOTES_PATTERN);
  }
}
