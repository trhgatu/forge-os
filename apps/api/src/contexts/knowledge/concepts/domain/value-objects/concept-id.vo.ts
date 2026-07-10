import { BaseId } from '@shared/value-objects/base-id.vo';
import { v4 as uuid } from 'uuid';

export class ConceptId extends BaseId {
  private constructor(id: string) {
    super(id);
  }

  static create(id?: string): ConceptId {
    return new ConceptId(id ?? uuid());
  }

  static fromString(id: string): ConceptId {
    return new ConceptId(id);
  }

  static random(): ConceptId {
    return new ConceptId(uuid());
  }
}
