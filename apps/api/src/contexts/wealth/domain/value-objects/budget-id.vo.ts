import { BaseId } from '@shared/value-objects/base-id.vo';
import { v4 as uuid } from 'uuid';

export class BudgetId extends BaseId {
  private constructor(id: string) {
    super(id);
  }

  static create(id?: string): BudgetId {
    return new BudgetId(id ?? uuid());
  }

  static fromString(id: string): BudgetId {
    return new BudgetId(id);
  }

  static random(): BudgetId {
    return new BudgetId(uuid());
  }
}
