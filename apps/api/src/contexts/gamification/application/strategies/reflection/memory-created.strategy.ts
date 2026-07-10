import { Injectable } from '@nestjs/common';
import { IXpStrategy, XpStrategy, IXpRateLimitConfig } from '../xp-strategy.decorator';
import { ConfigService } from '../../../../system/config/application/services/config.service';

export interface MemoryCreatedPayload {
  memoryId: string;
}

@Injectable()
@XpStrategy('reflection.memory.created')
export class MemoryCreatedXpStrategy implements IXpStrategy<MemoryCreatedPayload> {
  constructor(private readonly configService: ConfigService) {}

  private getRule() {
    const rules = this.configService.get<Record<string, any>>('gamification_xp_rules', {});
    return rules['reflection.memory.created'] || { xp: 0, cooldownMinutes: 10, dailyCap: 2 };
  }

  calculate() {
    return this.getRule().xp;
  }

  getDescription() {
    return `Created a Memory Codex Entry`;
  }

  getRateLimitConfig(): IXpRateLimitConfig {
    const rule = this.getRule();
    return {
      cooldownMinutes: rule.cooldownMinutes,
      dailyCap: rule.dailyCap,
    };
  }
}
