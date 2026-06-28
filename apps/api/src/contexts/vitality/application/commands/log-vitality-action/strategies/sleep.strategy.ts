import { Injectable } from '@nestjs/common';
import { VitalityActionStrategy } from './vitality-action.strategy';
import { UserVitality } from '../../../../domain/entities/user-vitality.entity';
import { VitalityLog } from '../../../../domain/entities/vitality-log.entity';

@Injectable()
export class SleepStrategy implements VitalityActionStrategy {
  readonly type = 'SLEEP';

  execute(
    vitality: UserVitality,
    log: VitalityLog,
    context: { activeEffectTypes: string[]; now: Date; sleepTarget: number; sleepReset: number },
  ): void {
    vitality.updateStaminaState(
      context.now,
      [log],
      context.activeEffectTypes,
      context.sleepTarget,
      context.sleepReset,
    );
  }
}
