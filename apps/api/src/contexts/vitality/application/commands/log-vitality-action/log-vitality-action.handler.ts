import { CommandHandler, ICommandHandler, CommandBus, EventBus } from '@nestjs/cqrs';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { LogVitalityActionCommand } from './log-vitality-action.command';
import { VitalityRepository } from '../../../domain/vitality.repository';
import { VitalityLog } from '../../../domain/entities/vitality-log.entity';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { ConfigService } from '@root/contexts/system/config/application/services/config.service';
import { VitalityStrategyRegistry } from './strategies/vitality-strategy.registry';
import { VitalityActionLoggedEvent } from '../../events/vitality-action-logged.event';

@CommandHandler(LogVitalityActionCommand)
@Injectable()
export class LogVitalityActionHandler implements ICommandHandler<LogVitalityActionCommand> {
  constructor(
    private readonly repository: VitalityRepository,
    private readonly commandBus: CommandBus,
    private readonly eventBus: EventBus,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly strategyRegistry: VitalityStrategyRegistry,
  ) {}

  async execute(command: LogVitalityActionCommand): Promise<any> {
    const { userId, type, value, metadata } = command;
    const now = new Date();

    const vitality = await this.repository.findVitalityByUserId(userId);
    if (!vitality) {
      throw new NotFoundException(`Vitality stats for user ${userId} not found.`);
    }

    // Fetch active effects to apply lazy stamina calculations
    const activeEffects = await this.prisma.userStatusEffect.findMany({
      where: {
        userId,
        expiresAt: { gte: now },
      },
      select: { type: true },
    });
    const activeEffectTypes = activeEffects.map((e) => e.type);
    const sleepTarget = this.configService.get<number>('sleep_daily_target_hours', 8.0);
    const sleepReset = this.configService.get<number>('sleep_stamina_reset_percent', 90);

    // 1. Check Stamina threshold for Maktub Alignment
    if (type === 'MAKTUB_ALIGN') {
      vitality.updateStaminaState(now, [], activeEffectTypes, sleepTarget, sleepReset); // lazy sync first
      if (vitality.stamina < 30) {
        throw new BadRequestException(
          'Insufficient stamina for Maktub alignment. Try sleeping or drinking water.',
        );
      }
    }

    // 2. Create and Save Vitality Log
    const log = VitalityLog.create({
      userId,
      type,
      value,
      metadata,
      loggedAt: now,
    });
    await this.repository.saveLog(log);

    // 3. Dispatch to strategy
    const strategy = this.strategyRegistry.get(type);
    await strategy.execute(vitality, log, {
      activeEffectTypes,
      now,
      sleepTarget,
      sleepReset,
    });

    await this.repository.saveVitality(vitality);

    // Publish event for quests to catch and status effects to apply asynchronously
    this.eventBus.publish(new VitalityActionLoggedEvent(log.id.value, userId, type, value));

    return vitality.toPrimitives();
  }
}
