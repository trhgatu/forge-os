import { Injectable } from '@nestjs/common';
import { VitalityActionStrategy } from './vitality-action.strategy';
import { UserVitality } from '../../../../domain/entities/user-vitality.entity';
import { VitalityLog } from '../../../../domain/entities/vitality-log.entity';

@Injectable()
export class MaktubAlignStrategy implements VitalityActionStrategy {
  readonly type = 'MAKTUB_ALIGN';

  execute(
    vitality: UserVitality,
    log: VitalityLog,
    context: { activeEffectTypes: string[]; now: Date },
  ): void {
    vitality.consumeStamina(20, context.activeEffectTypes, context.now);
  }
}
