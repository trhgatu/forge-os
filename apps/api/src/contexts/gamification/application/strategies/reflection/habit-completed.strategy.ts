import { Injectable } from '@nestjs/common';
import { IXpStrategy, XpStrategy, IXpRateLimitConfig } from '../xp-strategy.decorator';
import { ConfigService } from '../../../../system/config/application/services/config.service';

export interface HabitCompletedPayload {
  title: string;
  habitId: string;
  xpReward: number;
}

@Injectable()
@XpStrategy('reflection.habit.completed')
export class HabitCompletedXpStrategy implements IXpStrategy<HabitCompletedPayload> {
  constructor(private readonly configService: ConfigService) {}

  private getRule() {
    const rules = this.configService.get<Record<string, any>>('gamification_xp_rules', {});
    return rules['reflection.habit.completed'] || { xp: 0, cooldownMinutes: 1, dailyCap: 15 };
  }

  calculate(payload: HabitCompletedPayload) {
    const rule = this.getRule();
    return rule.xp === -1 ? payload.xpReward || 25 : rule.xp;
  }

  getDescription(payload: HabitCompletedPayload) {
    return `Completed Habit: ${payload.title || 'Unknown'}`;
  }

  getRateLimitConfig(): IXpRateLimitConfig {
    const rule = this.getRule();
    return {
      cooldownMinutes: rule.cooldownMinutes,
      dailyCap: rule.dailyCap,
    };
  }
}
