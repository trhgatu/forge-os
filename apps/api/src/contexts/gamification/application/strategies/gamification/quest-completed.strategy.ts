import { Injectable } from '@nestjs/common';
import { IXpStrategy, XpStrategy, IXpRateLimitConfig } from '../xp-strategy.decorator';

export interface QuestCompletedPayload {
  title: string;
  questId: string;
  xpReward: number;
  isCustom?: boolean; // Tín hiệu nhận diện Custom Quest của người dùng
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

  getRateLimitConfig(payload?: QuestCompletedPayload): IXpRateLimitConfig {
    if (payload?.isCustom) {
      return {
        cooldownMinutes: 60,
        dailyCap: 2,
      };
    }
    return {
      cooldownMinutes: 0,
      dailyCap: 20,
    };
  }
}
