import { Injectable } from '@nestjs/common';
import { IXpStrategy, XpStrategy, IXpRateLimitConfig } from '../xp-strategy.decorator';

export interface RoutineCompletedPayload {
  title?: string;
  routineId: string;
  comboXp: number;
}

@Injectable()
@XpStrategy('reflection.routine.completed')
export class RoutineCompletedXpStrategy implements IXpStrategy<RoutineCompletedPayload> {
  calculate(payload: RoutineCompletedPayload) {
    return payload.comboXp || 0;
  }

  getDescription(payload: RoutineCompletedPayload) {
    return `Completed Routine Chain: ${payload.title || 'Unknown'}`;
  }

  getRateLimitConfig(): IXpRateLimitConfig {
    return {
      cooldownMinutes: 5,
      dailyCap: 5,
    };
  }
}
