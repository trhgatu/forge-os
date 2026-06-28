import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { GetVitalityStatsQuery } from './get-vitality.query';
import { VitalityRepository } from '../../../domain/vitality.repository';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { ConfigService } from '@root/contexts/system/config/application/services/config.service';

@QueryHandler(GetVitalityStatsQuery)
@Injectable()
export class GetVitalityStatsHandler implements IQueryHandler<GetVitalityStatsQuery> {
  constructor(
    private readonly repository: VitalityRepository,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async execute(query: GetVitalityStatsQuery): Promise<any> {
    const { userId } = query;
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

    // 1. Apply lazy stamina decay/recovery
    vitality.updateStaminaState(now, [], activeEffectTypes, sleepTarget, sleepReset);
    await this.repository.saveVitality(vitality);

    // 2. Fetch today's activities to return totals
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const logsToday = await this.repository.findLogsByUserId(userId, {
      since: startOfDay,
    });

    const hydrationMl = logsToday
      .filter((l) => l.type === 'HYDRATION')
      .reduce((sum, l) => sum + l.value, 0);

    const sleepLogs = logsToday.filter((l) => l.type === 'SLEEP');
    const sleepLogged = sleepLogs.length > 0;
    const sleepDurationHours = sleepLogs.reduce((sum, l) => sum + l.value, 0);
    const sleepQuality = sleepLogs.length > 0 ? sleepLogs[0].metadata?.quality : null;

    const workouts = logsToday
      .filter((l) => l.type === 'WORKOUT')
      .map((l) => ({
        id: l.id.value,
        type: l.metadata?.category || 'general',
        durationMinutes: l.value,
        intensity: l.metadata?.intensity || 'medium',
        caloriesBurned: l.metadata?.calories || 0,
        loggedAt: l.loggedAt,
      }));

    return {
      ...vitality.toPrimitives(),
      totalsToday: {
        hydrationMl,
        sleep: {
          logged: sleepLogged,
          durationHours: sleepDurationHours,
          quality: sleepQuality,
        },
        workouts,
      },
    };
  }
}
