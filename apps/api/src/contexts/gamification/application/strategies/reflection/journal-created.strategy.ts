import { Injectable } from '@nestjs/common';
import { IXpStrategy, XpStrategy, IXpRateLimitConfig } from '../xp-strategy.decorator';
import { ConfigService } from '../../../../system/config/application/services/config.service';

export interface JournalCreatedPayload {
  title: string;
  journalId: string;
}

@Injectable()
@XpStrategy('reflection.journal.created')
export class JournalCreatedXpStrategy implements IXpStrategy<JournalCreatedPayload> {
  constructor(private readonly configService: ConfigService) {}

  private getRule() {
    const rules = this.configService.get<Record<string, any>>('gamification_xp_rules', {});
    return rules['reflection.journal.created'] || { xp: 0, cooldownMinutes: 5, dailyCap: 3 };
  }

  calculate() {
    return this.getRule().xp;
  }

  getDescription(payload: JournalCreatedPayload) {
    return `Wrote Journal Entry: ${payload.title || 'Unknown'}`;
  }

  getRateLimitConfig(): IXpRateLimitConfig {
    const rule = this.getRule();
    return {
      cooldownMinutes: rule.cooldownMinutes,
      dailyCap: rule.dailyCap,
    };
  }
}
