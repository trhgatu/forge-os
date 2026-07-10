import { Injectable } from '@nestjs/common';
import { IXpStrategy, XpStrategy, IXpRateLimitConfig } from '../xp-strategy.decorator';
import { ConfigService } from '../../../../system/config/application/services/config.service';

export interface MoodLoggedPayload {
  moodId: string;
  mood: string;
}

@Injectable()
@XpStrategy('reflection.mood.logged')
export class MoodLoggedXpStrategy implements IXpStrategy<MoodLoggedPayload> {
  constructor(private readonly configService: ConfigService) {}

  private getRule() {
    const rules = this.configService.get<Record<string, any>>('gamification_xp_rules', {});
    return rules['reflection.mood.logged'] || { xp: 0, cooldownMinutes: 15, dailyCap: 2 };
  }

  calculate() {
    return this.getRule().xp;
  }

  getDescription(payload: MoodLoggedPayload) {
    return `Logged Mood: ${payload.mood || 'Unknown'}`;
  }

  getRateLimitConfig(): IXpRateLimitConfig {
    const rule = this.getRule();
    return {
      cooldownMinutes: rule.cooldownMinutes,
      dailyCap: rule.dailyCap,
    };
  }
}
