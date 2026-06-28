import { UserVitality } from '../../../../domain/entities/user-vitality.entity';
import { VitalityLog } from '../../../../domain/entities/vitality-log.entity';

export interface VitalityActionStrategy {
  readonly type: string;
  execute(
    vitality: UserVitality,
    log: VitalityLog,
    context: {
      activeEffectTypes: string[];
      now: Date;
      sleepTarget: number;
      sleepReset: number;
    },
  ): Promise<void> | void;
}
