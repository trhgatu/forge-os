import { BaseId } from '@shared/value-objects/base-id.vo';
import { v4 as uuid } from 'uuid';

export class ProjectId extends BaseId {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): ProjectId {
    return new ProjectId(value);
  }

  static random(): ProjectId {
    return new ProjectId(uuid());
  }
}
