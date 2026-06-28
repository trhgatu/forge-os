import { BaseId } from '@shared/value-objects/base-id.vo';
import { v4 as uuid } from 'uuid';

export class RoutineId extends BaseId {
  private constructor(id: string) {
    super(id);
  }

  static create(id?: string): RoutineId {
    return new RoutineId(id ?? uuid());
  }

  static fromString(id: string): RoutineId {
    return new RoutineId(id);
  }

  static random(): RoutineId {
    return new RoutineId(uuid());
  }
}
