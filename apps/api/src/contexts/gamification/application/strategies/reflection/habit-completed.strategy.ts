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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  calculate(_payload: HabitCompletedPayload) {
    return 0; // Habits yield 0 raw level-up XP directly to prevent farming. XP is concentrated in Quests!
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
