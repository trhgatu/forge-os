import { Injectable } from '@nestjs/common';
import { VitalityActionStrategy } from './vitality-action.strategy';
import { UserVitality } from '../../../../domain/entities/user-vitality.entity';
import { VitalityLog } from '../../../../domain/entities/vitality-log.entity';

@Injectable()
export class WorkoutStrategy implements VitalityActionStrategy {
  readonly type = 'WORKOUT';

  execute(
    vitality: UserVitality,
    log: VitalityLog,
    context: { activeEffectTypes: string[]; now: Date },
  ): void {
    vitality.consumeStamina(15, context.activeEffectTypes, context.now);
  }
}
