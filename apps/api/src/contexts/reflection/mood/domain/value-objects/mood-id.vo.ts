import { BaseId } from '@shared/value-objects/base-id.vo';
import { v4 as uuid } from 'uuid';

export class MoodId extends BaseId {
  private constructor(id: string) {
    super(id);
  }

  static create(id?: string): MoodId {
    return new MoodId(id ?? uuid());
  }

  static random(): MoodId {
    return new MoodId(uuid());
  }
}
