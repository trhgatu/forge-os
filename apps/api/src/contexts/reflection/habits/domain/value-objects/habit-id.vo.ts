import { BaseId } from '@shared/value-objects/base-id.vo';
import { v4 as uuid } from 'uuid';

export class HabitId extends BaseId {
  private constructor(id: string) {
    super(id);
  }

  static create(id?: string): HabitId {
    return new HabitId(id ?? uuid());
  }

  static fromString(id: string): HabitId {
    return new HabitId(id);
  }

  static random(): HabitId {
    return new HabitId(uuid());
  }
}
