import { Concept as ConceptEntity } from '../../domain/concept.entity';
import { KnowledgeConcept as PrismaConcept } from '@prisma/client';

export class ConceptMapper {
  static toDomain(raw: PrismaConcept): ConceptEntity {
    return ConceptEntity.createFromPersistence(
      {
        userId: raw.userId,
        title: raw.title,
        sourceType: raw.sourceType,
        sourceUrl: raw.sourceUrl,
        content: raw.content,
        summary: raw.summary ?? '',
        insights: Array.isArray(raw.insights) ? (raw.insights as string[]) : [],
        reflection: raw.reflection,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    );
  }

  static toPersistence(entity: ConceptEntity): PrismaConcept {
    const raw = entity.toPersistence();
    return {
      id: raw.id,
      userId: raw.userId,
      title: raw.title,
      sourceType: raw.sourceType,
      sourceUrl: raw.sourceUrl ?? null,
      content: raw.content,
      summary: raw.summary,
      insights: raw.insights as any,
      reflection: raw.reflection ?? null,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    };
  }
}
