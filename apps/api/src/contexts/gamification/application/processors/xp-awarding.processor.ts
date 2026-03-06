// apps/api/src/contexts/gamification/application/processors/xp-awarding.processor.ts
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger, OnModuleInit } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { DiscoveryService } from '@nestjs/core';
import { AwardXpCommand } from '../commands/award-xp.command';
import { IXpStrategy, XP_STRATEGY_KEY } from '../strategies/xp-strategy.decorator';
import { StreamEventPayload } from '@shared/domain/events/stream-event.interface';
import { JobResult } from '@shared/domain/dtos/job-result.dto';

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
  async process(job: Job<StreamEventPayload>): Promise<JobResult> {
    const startTime = Date.now();
    const { pattern, userId, payload } = job.data;
    const strategy = this.strategyMap.get(pattern);

    const getMeta = () => ({
      pattern,
      timestamp: new Date().toISOString(),
      duration: Date.now() - startTime,
    });

    if (!strategy) {
      return { status: 'skipped', reason: 'STRATEGY_NOT_FOUND', metadata: getMeta() };
    }

    const targetUserId = typeof userId === 'string' ? userId : userId?.value;
    if (!targetUserId) {
      return { status: 'failed', reason: 'MISSING_USER_ID', metadata: getMeta() };
    }

    try {
      const xpAmount = strategy.calculate(payload);
      const description = strategy.getDescription(payload);

      if (xpAmount <= 0) {
        return {
          status: 'skipped',
          reason: 'ZERO_XP',
          data: { userId: targetUserId },
          metadata: getMeta(),
        };
      }

      await this.commandBus.execute(new AwardXpCommand(targetUserId, xpAmount, description));
      return {
        status: 'completed',
        data: {
          awardedXp: xpAmount,
          user: targetUserId,
          description,
        },
        metadata: getMeta(),
      };
    } catch (error) {
      this.logger.error(`[Processor Error] ${pattern}: ${error}`);
      throw error;
    }
  }
}
