import { BaseId } from '@shared/value-objects/base-id.vo';
import { v4 as uuid } from 'uuid';

export class AllocationRuleId extends BaseId {
  private constructor(id: string) {
    super(id);
  }

  static create(id?: string): AllocationRuleId {
    return new AllocationRuleId(id ?? uuid());
  }

  static fromString(id: string): AllocationRuleId {
    return new AllocationRuleId(id);
  }

  static random(): AllocationRuleId {
    return new AllocationRuleId(uuid());
  }
}
