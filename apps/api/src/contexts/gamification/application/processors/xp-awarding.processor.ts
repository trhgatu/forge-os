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
import { XpRateLimitService } from '../services/xp-rate-limit.service';

@Processor('xp_awarding')
export class XpAwardingProcessor extends WorkerHost implements OnModuleInit {
  private readonly logger = new Logger(XpAwardingProcessor.name);
  private readonly strategyMap = new Map<string, IXpStrategy<any>>();

  constructor(
    private readonly commandBus: CommandBus,
    private readonly discoveryService: DiscoveryService,
    private readonly rateLimitService: XpRateLimitService,
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

      const config = strategy.getRateLimitConfig();
      const { allowed, reason } = await this.rateLimitService.checkAndRecord(
        targetUserId,
        pattern,
        config,
        xpAmount,
      );

      if (!allowed) {
        this.logger.debug(`[XP-RateLimit] Blocked ${pattern} for ${targetUserId}: ${reason}`);
        return {
          status: 'skipped',
          reason: `RATE_LIMIT_${reason?.toUpperCase() || 'EXCEEDED'}`,
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
      if (strategy && targetUserId) {
        try {
          const config = strategy.getRateLimitConfig();
          const xpAmount = strategy.calculate(payload);
          await this.rateLimitService.refund(targetUserId, pattern, config, xpAmount);
          this.logger.debug(`[XP-RateLimit] Refunded quota for ${pattern} due to error`);
        } catch (refundError) {
          this.logger.error(`[XP-RateLimit] Failed to refund quota: ${refundError}`);
        }
      }

      this.logger.error(`[Processor Error] ${pattern}: ${error}`);
      throw error;
    }
  }
}
