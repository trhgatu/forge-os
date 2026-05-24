import { Injectable } from '@nestjs/common';
import { IXpStrategy, XpStrategy, IXpRateLimitConfig } from '../xp-strategy.decorator';

export interface JournalCreatedPayload {
  title: string;
  journalId: string;
}

@Injectable()
@XpStrategy('reflection.journal.created')
export class JournalCreatedXpStrategy implements IXpStrategy<JournalCreatedPayload> {
  calculate() {
    return 0; // Journal entries yield 0 raw level-up XP directly to prevent farming. XP is concentrated in Quests!
  }

  getDescription(payload: JournalCreatedPayload) {
    return `Wrote Journal Entry: ${payload.title || 'Unknown'}`;
  }

  getRateLimitConfig(): IXpRateLimitConfig {
    return {
      cooldownMinutes: 5, // Cooldown of 5 minutes to prevent spamming empty thoughts
      dailyCap: 3, // Max 3 paid journal pages per day
    };
  }
}
