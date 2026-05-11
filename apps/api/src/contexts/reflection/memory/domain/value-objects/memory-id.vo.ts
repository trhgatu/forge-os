import { BaseId } from '@shared/value-objects/base-id.vo';
import { v4 as uuid } from 'uuid';

export class MemoryId extends BaseId {
  private constructor(id: string) {
    super(id);
  }

  static create(id?: string): MemoryId {
    return new MemoryId(id ?? uuid());
  }

  static random(): MemoryId {
    return new MemoryId(uuid());
  }
}
