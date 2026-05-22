import { Injectable } from '@nestjs/common';
import { IXpStrategy, XpStrategy, IXpRateLimitConfig } from '../xp-strategy.decorator';

export interface HabitCompletedPayload {
  title: string;
  habitId: string;
  xpReward: number;
}

@Injectable()
@XpStrategy('reflection.habit.completed')
export class HabitCompletedXpStrategy implements IXpStrategy<HabitCompletedPayload> {
  calculate(payload: HabitCompletedPayload) {
    return payload.xpReward || 10;
  }

  getDescription(payload: HabitCompletedPayload) {
    return `Completed Habit: ${payload.title || 'Unknown'}`;
  }

  getRateLimitConfig(): IXpRateLimitConfig {
    return {
      cooldownMinutes: 1, // 1 minute cooldown per habit to prevent multi-click exploits
      dailyCap: 15,
    };
  }
}
