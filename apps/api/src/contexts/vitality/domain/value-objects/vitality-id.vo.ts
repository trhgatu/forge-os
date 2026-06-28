import { BaseId } from '@shared/value-objects/base-id.vo';
import { v4 as uuid } from 'uuid';

export class VitalityLogId extends BaseId {
  private constructor(id: string) {
    super(id);
  }

  static create(id?: string): VitalityLogId {
    return new VitalityLogId(id ?? uuid());
  }

  static fromString(id: string): VitalityLogId {
    return new VitalityLogId(id);
  }

  static random(): VitalityLogId {
    return new VitalityLogId(uuid());
  }
}

export class StatusEffectId extends BaseId {
  private constructor(id: string) {
    super(id);
  }

  static create(id?: string): StatusEffectId {
    return new StatusEffectId(id ?? uuid());
  }

  static fromString(id: string): StatusEffectId {
    return new StatusEffectId(id);
  }

  static random(): StatusEffectId {
    return new StatusEffectId(uuid());
  }
}
