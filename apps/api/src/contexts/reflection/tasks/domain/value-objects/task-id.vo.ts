import { BaseId } from '@shared/value-objects/base-id.vo';
import { v4 as uuid } from 'uuid';

export class TaskId extends BaseId {
  private constructor(id: string) {
    super(id);
  }

  static create(id?: string): TaskId {
    return new TaskId(id ?? uuid());
  }

  static fromString(id: string): TaskId {
    return new TaskId(id);
  }

  static random(): TaskId {
    return new TaskId(uuid());
  }
}
