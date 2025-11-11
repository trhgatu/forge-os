import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { MemoryModifiedEvent } from '../events/memory-modified.event';
import { CacheService } from '@shared/services/cache.service';

@EventsHandler(MemoryModifiedEvent)
export class InvalidateMemoryCacheHandler
  implements IEventHandler<MemoryModifiedEvent>
{
  constructor(private readonly cacheService: CacheService) {}

  async handle(event: MemoryModifiedEvent): Promise<void> {
    console.log('🔥 MemoryModifiedEvent received:', event);
    await this.cacheService.deleteByPattern('memories:all:*');
    await this.cacheService.deleteByPattern('memories:public:*');
    await this.cacheService.deleteByPattern(`memories:id:${event.memoryId}`);
  }
}
