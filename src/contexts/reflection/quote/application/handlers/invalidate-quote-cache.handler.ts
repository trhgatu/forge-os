import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { QuoteModifiedEvent } from '../events/quote-modified.event';
import { CacheService } from '@shared/services/cache.service';
import { LoggerService } from '@shared/logging/logger.service';

@EventsHandler(QuoteModifiedEvent)
export class InvalidateQuoteCacheHandler
  implements IEventHandler<QuoteModifiedEvent>
{
  constructor(
    private readonly cacheService: CacheService,
    private readonly logger: LoggerService,
  ) {}

  async handle(event: QuoteModifiedEvent): Promise<void> {
    this.logger.log(
      `Quote modified event received: ${event.quoteId}`,
      'InvalidateQuoteCacheHandler',
    );
    await this.cacheService.deleteByPattern('quotes:all:*');
    await this.cacheService.deleteByPattern('quotes:public:*');
    await this.cacheService.deleteByPattern(`quotes:id:${event.quoteId}`);
  }
}
