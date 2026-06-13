import { Concept } from './concept.entity';
import { ConceptId } from './value-objects/concept-id.vo';
import { KnowledgeSourceType } from '@prisma/client';

export interface ConceptRepository {
  save(concept: Concept): Promise<void>;
  findAll(userId: string, sourceType?: KnowledgeSourceType): Promise<Concept[]>;
  findById(id: ConceptId, userId: string): Promise<Concept | null>;
  delete(id: ConceptId, userId: string): Promise<void>;
}
export const ConceptRepository = Symbol('ConceptRepository');
