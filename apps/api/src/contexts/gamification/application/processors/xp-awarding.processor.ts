// apps/api/src/contexts/gamification/application/processors/xp-awarding.processor.ts
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger, OnModuleInit } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { DiscoveryService } from '@nestjs/core';
import { AwardXpCommand } from '../commands/award-xp.command';
import { IXpStrategy, XP_STRATEGY_KEY } from '../strategies/xp-strategy.decorator';
import { StreamEventPayload } from '@shared/domain/events/stream-event.interface';
import { getErrorMessage } from '@shared/utils';

@Processor('xp_awarding')
export class XpAwardingProcessor extends WorkerHost implements OnModuleInit {
  private readonly logger = new Logger(XpAwardingProcessor.name);
  private readonly strategyMap = new Map<string, IXpStrategy<any>>();

  constructor(
    private readonly commandBus: CommandBus,
    private readonly discoveryService: DiscoveryService,
  ) {
    super();
  }

  onModuleInit() {
    const providers = this.discoveryService.getProviders();

    providers.forEach((wrapper) => {
      const { instance } = wrapper;
      if (!instance || typeof instance !== 'object') return;

      const targetConstructor = instance.constructor as object;
      const metadata = Reflect.getMetadata(XP_STRATEGY_KEY, targetConstructor);

      if (typeof metadata === 'string') {
        this.strategyMap.set(metadata, instance as IXpStrategy<any>);
        this.logger.log(`[XP-Discovery] Registered strategy for: ${metadata}`);
      }
    });
  }

  async process(job: Job<StreamEventPayload>): Promise<void> {
    const { pattern, userId, payload } = job.data;
    const strategy = this.strategyMap.get(pattern);

    if (!strategy) {
      if (pattern.includes('.')) {
        this.logger.warn(`[XP-Worker] No strategy found for pattern: ${pattern}`);
      }
      return;
    }

    const targetUserId = typeof userId === 'string' ? userId : userId?.value;
    if (!targetUserId) {
      this.logger.error(`[XP-Worker] Missing UserID in event: ${pattern}`);
      return;
    }

    try {
      const xpAmount = strategy.calculate(payload);
      const description = strategy.getDescription(payload);

      if (xpAmount <= 0) {
        this.logger.debug(`[XP-Worker] Zero XP for ${pattern}, skipping...`);
        return;
      }

      await this.commandBus.execute(new AwardXpCommand(targetUserId, xpAmount, description));
      this.logger.log(`[Success] ${xpAmount} XP awarded to ${targetUserId} via ${pattern}`);
    } catch (error) {
      this.logger.error(`[Error] ${pattern}: ${getErrorMessage(error)}`);
      throw error;
    }
  }
}
