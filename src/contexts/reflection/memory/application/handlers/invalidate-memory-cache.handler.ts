import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { MemoryModifiedEvent } from '../events/memory-modified.event';
import { CacheService } from '@shared/services/cache.service';
import { LoggerService } from '@shared/logging/logger.service';

@EventsHandler(MemoryModifiedEvent)
export class InvalidateMemoryCacheHandler
  implements IEventHandler<MemoryModifiedEvent>
{
  constructor(
    private readonly cacheService: CacheService,
    private readonly logger: LoggerService,
  ) {}

  async handle(event: MemoryModifiedEvent): Promise<void> {
    this.logger.log(
      `Memory modified event received: ${event.memoryId}`,
      'InvalidateMemoryCacheHandler',
    );
    await this.cacheService.deleteByPattern('memories:all:*');
    await this.cacheService.deleteByPattern('memories:public:*');
    await this.cacheService.deleteByPattern(`memories:id:${event.memoryId}`);
  }
}
