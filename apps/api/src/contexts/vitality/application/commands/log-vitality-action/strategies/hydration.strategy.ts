import { Injectable } from '@nestjs/common';
import { VitalityActionStrategy } from './vitality-action.strategy';
import { UserVitality } from '../../../../domain/entities/user-vitality.entity';
import { VitalityLog } from '../../../../domain/entities/vitality-log.entity';
import { ConfigService } from '@root/contexts/system/config/application/services/config.service';
import { VitalityRepository } from '../../../../domain/vitality.repository';

@Injectable()
export class HydrationStrategy implements VitalityActionStrategy {
  readonly type = 'HYDRATION';

  constructor(
    private readonly configService: ConfigService,
    private readonly repository: VitalityRepository,
  ) {}

  async execute(
    vitality: UserVitality,
    log: VitalityLog,
    context: { activeEffectTypes: string[]; now: Date },
  ): Promise<void> {
    const hydrationTarget = this.configService.get<number>('hydration_daily_target_ml', 3000);
    const hydrationRatio = this.configService.get<number>('hydration_stamina_recharge_ratio', 5);

    const startOfDay = new Date(context.now);
    startOfDay.setHours(0, 0, 0, 0);

    const logsToday = await this.repository.findLogsByUserId(log.userId, {
      type: 'HYDRATION',
      since: startOfDay,
    });

    const totalWaterToday = logsToday.reduce((sum, l) => sum + l.value, 0);
    if (totalWaterToday <= hydrationTarget) {
      vitality.drinkWater(log.value, context.activeEffectTypes, context.now, hydrationRatio);
    }
  }
}
