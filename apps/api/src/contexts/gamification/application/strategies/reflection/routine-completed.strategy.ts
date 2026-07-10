import { Injectable } from '@nestjs/common';
import { IXpStrategy, XpStrategy, IXpRateLimitConfig } from '../xp-strategy.decorator';
import { ConfigService } from '../../../../system/config/application/services/config.service';

export interface RoutineCompletedPayload {
  title?: string;
  routineId: string;
  comboXp: number;
}

@Injectable()
@XpStrategy('reflection.routine.completed')
export class RoutineCompletedXpStrategy implements IXpStrategy<RoutineCompletedPayload> {
  constructor(private readonly configService: ConfigService) {}

  private getRule() {
    const rules = this.configService.get<Record<string, any>>('gamification_xp_rules', {});
    return rules['reflection.routine.completed'] || { xp: -1, cooldownMinutes: 5, dailyCap: 5 };
  }

  calculate(payload: RoutineCompletedPayload) {
    const rule = this.getRule();
    return rule.xp === -1 ? payload.comboXp || 0 : rule.xp;
  }

  getDescription(payload: RoutineCompletedPayload) {
    return `Completed Routine Chain: ${payload.title || 'Unknown'}`;
  }

  getRateLimitConfig(): IXpRateLimitConfig {
    const rule = this.getRule();
    return {
      cooldownMinutes: rule.cooldownMinutes,
      dailyCap: rule.dailyCap,
    };
  }
}
