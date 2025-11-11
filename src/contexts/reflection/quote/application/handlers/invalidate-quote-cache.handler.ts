import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { QuoteModifiedEvent } from '../events/quote-modified.event';
import { CacheService } from '@shared/services/cache.service';

@EventsHandler(QuoteModifiedEvent)
export class InvalidateQuoteCacheHandler
  implements IEventHandler<QuoteModifiedEvent>
{
  constructor(private readonly cacheService: CacheService) {}

  async handle(event: QuoteModifiedEvent): Promise<void> {
    console.log('🔥 QuoteModifiedEvent received:', event);
    await this.cacheService.deleteByPattern('quotes:all:*');
    await this.cacheService.deleteByPattern('quotes:public:*');
    await this.cacheService.deleteByPattern(`quotes:id:${event.quoteId}`);
  }
}
