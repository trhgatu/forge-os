import { Injectable } from '@nestjs/common';
import { IXpStrategy, XpStrategy, IXpRateLimitConfig } from '../xp-strategy.decorator';

export interface MoodLoggedPayload {
  moodId: string;
  mood: string;
}

@Injectable()
@XpStrategy('reflection.mood.logged')
export class MoodLoggedXpStrategy implements IXpStrategy<MoodLoggedPayload> {
  calculate() {
    return 0; // Mood logging yields 0 raw level-up XP directly to prevent farming. XP is concentrated in Quests!
  }

  getDescription(payload: MoodLoggedPayload) {
    return `Logged Mood: ${payload.mood || 'Unknown'}`;
  }

  getRateLimitConfig(): IXpRateLimitConfig {
    return {
      cooldownMinutes: 15, // Cooldown to prevent spamming emotional state logs
      dailyCap: 2, // Max 2 rewarded logs per day
    };
  }
}
