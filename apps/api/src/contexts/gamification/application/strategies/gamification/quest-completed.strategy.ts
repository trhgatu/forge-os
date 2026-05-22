import { Injectable } from '@nestjs/common';
import { IXpStrategy, XpStrategy, IXpRateLimitConfig } from '../xp-strategy.decorator';

export interface QuestCompletedPayload {
  title: string;
  questId: string;
  xpReward: number;
}

@Injectable()
@XpStrategy('gamification.quest.completed')
export class QuestCompletedXpStrategy implements IXpStrategy<QuestCompletedPayload> {
  calculate(payload: QuestCompletedPayload) {
    return payload.xpReward || 50;
  }

  getDescription(payload: QuestCompletedPayload) {
    return `Completed Quest: ${payload.title || 'Unknown'}`;
  }

  getRateLimitConfig(): IXpRateLimitConfig {
    return {
      cooldownMinutes: 0,
      dailyCap: 20,
    };
  }
}
