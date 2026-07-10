import { Injectable } from '@nestjs/common';
import { IXpStrategy, XpStrategy, IXpRateLimitConfig } from '../xp-strategy.decorator';
import { ConfigService } from '../../../../system/config/application/services/config.service';

export interface QuestCompletedPayload {
  title: string;
  questId: string;
  xpReward: number;
  isCustom?: boolean; // Tín hiệu nhận diện Custom Quest của người dùng
}

@Injectable()
@XpStrategy('gamification.quest.completed')
export class QuestCompletedXpStrategy implements IXpStrategy<QuestCompletedPayload> {
  constructor(private readonly configService: ConfigService) {}

  private getRule() {
    const rules = this.configService.get<Record<string, any>>('gamification_xp_rules', {});
    return (
      rules['gamification.quest.completed'] || {
        xp: -1,
        cooldownMinutes: 0,
        dailyCap: 20,
        customCooldownMinutes: 60,
        customDailyCap: 2,
      }
    );
  }

  calculate(payload: QuestCompletedPayload) {
    const rule = this.getRule();
    return rule.xp === -1 ? payload.xpReward || 50 : rule.xp;
  }

  getDescription(payload: QuestCompletedPayload) {
    return `Completed Quest: ${payload.title || 'Unknown'}`;
  }

  getRateLimitConfig(payload?: QuestCompletedPayload): IXpRateLimitConfig {
    const rule = this.getRule();
    if (payload?.isCustom) {
      return {
        cooldownMinutes: rule.customCooldownMinutes ?? 60,
        dailyCap: rule.customDailyCap ?? 2,
      };
    }
    return {
      cooldownMinutes: rule.cooldownMinutes,
      dailyCap: rule.dailyCap,
    };
  }
}
