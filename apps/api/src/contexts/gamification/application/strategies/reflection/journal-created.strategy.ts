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
    return 0;
  }

  getDescription(payload: JournalCreatedPayload) {
    return `Wrote Journal Entry: ${payload.title || 'Unknown'}`;
  }

  getRateLimitConfig(): IXpRateLimitConfig {
    return {
      cooldownMinutes: 5,
      dailyCap: 3,
    };
  }
}
