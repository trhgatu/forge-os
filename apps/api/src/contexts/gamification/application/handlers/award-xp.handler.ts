import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AwardXpCommand } from '../commands/award-xp.command';
import { Inject } from '@nestjs/common';
import { UserStatsRepository } from '../../domain/ports/user-stats.repository';
import { UserStats } from '../../domain/user-stats.entity';
import { GamificationGateway } from '../../presentation/gamification.gateway';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { ConfigService } from '@root/contexts/system/config/application/services/config.service';

@CommandHandler(AwardXpCommand)
export class AwardXpHandler implements ICommandHandler<AwardXpCommand> {
  constructor(
    @Inject('UserStatsRepository')
    private readonly userStatsRepository: UserStatsRepository,
    private readonly gamificationGateway: GamificationGateway,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async execute(command: AwardXpCommand): Promise<void> {
    const { userId, amount, reason } = command;
    let stats = await this.userStatsRepository.findByUserId(userId);

    if (!stats) {
      // Create new stats if first time
      stats = new UserStats(userId, 0, 1, 'Novice', 0, new Date(), []);
    }

    // 1. Calculate XP multipliers from physical state & active status effects
    let multiplier = 1.0;

    const activeEffects = await this.prisma.userStatusEffect.findMany({
      where: {
        userId,
        expiresAt: { gte: new Date() },
      },
      select: { type: true },
    });

    const hasStoicResolve = activeEffects.some((e) => e.type === 'STOIC_RESOLVE');
    const hasCaffeineRush = activeEffects.some((e) => e.type === 'CAFFEINE_RUSH');

    const flowThreshold = this.configService.get<number>('flow_state_stamina_threshold', 70);
    const flowMultiplier = this.configService.get<number>('flow_state_xp_multiplier', 0.2);
    const stoicBonus = this.configService.get<number>('stoic_resolve_xp_bonus', 0.2);
    const caffeineBonus = this.configService.get<number>('caffeine_rush_xp_bonus', 0.1);

    // Fetch user stamina
    const statsRecord = await this.prisma.userStats.findUnique({
      where: { userId },
      select: { stamina: true },
    });
    const stamina = statsRecord?.stamina ?? 100;

    if (stamina >= flowThreshold) {
      multiplier += flowMultiplier;
    }
    if (hasStoicResolve) {
      multiplier += stoicBonus;
    }
    if (hasCaffeineRush) {
      multiplier += caffeineBonus;
    }

    const finalAmount = Math.round(amount * multiplier);

    // 2. Add XP to stats
    stats.addXp(finalAmount);
    stats.updateStreak();

    await this.userStatsRepository.save(stats);

    // Notify Frontend via Socket
    const displayReason = reason
      ? `${reason}${multiplier > 1.0 ? ` (${Math.round((multiplier - 1.0) * 100)}% Buff)` : ''}`
      : 'Action Completed';

    this.gamificationGateway.emitXpAwarded(userId, {
      xp: finalAmount,
      newLevel: stats.level,
      reason: displayReason,
    });

    stats.commit();
  }
}
