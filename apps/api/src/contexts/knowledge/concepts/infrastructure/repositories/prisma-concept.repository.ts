import { Injectable, NotFoundException } from '@nestjs/common';
import { ConceptRepository } from '../../domain/concept.repository';
import { Concept as ConceptEntity } from '../../domain/concept.entity';
import { ConceptId } from '../../domain/value-objects/concept-id.vo';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { ConceptMapper } from './concept.mapper';
import { EventBus } from '@nestjs/cqrs';
import { KnowledgeSourceType } from '@prisma/client';

@Injectable()
export class PrismaConceptRepository implements ConceptRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async save(concept: ConceptEntity): Promise<void> {
    const data = ConceptMapper.toPersistence(concept);
    const id = concept.id.toString();

    await this.prisma.knowledgeConcept.upsert({
      where: { id },
      update: {
        title: data.title,
        sourceType: data.sourceType,
        sourceUrl: data.sourceUrl,
        content: data.content,
        summary: data.summary,
        insights: data.insights as any,
        reflection: data.reflection,
        userId: data.userId,
      },
      create: {
        id,
        title: data.title,
        sourceType: data.sourceType,
        sourceUrl: data.sourceUrl,
        content: data.content,
        summary: data.summary,
        insights: data.insights as any,
        reflection: data.reflection,
        userId: data.userId,
      },
    });

    if (concept.domainEvents.length > 0) {
      concept.domainEvents.forEach((event) => this.eventBus.publish(event));
      concept.clearDomainEvents();
    }
  }

  async findAll(userId: string, sourceType?: KnowledgeSourceType): Promise<ConceptEntity[]> {
    const data = await this.prisma.knowledgeConcept.findMany({
      where: {
        userId,
        ...(sourceType ? { sourceType } : {}),
      },
      orderBy: { createdAt: 'desc' },
    });
    return data.map((doc) => ConceptMapper.toDomain(doc));
  }

  async findById(id: ConceptId, userId: string): Promise<ConceptEntity | null> {
    const doc = await this.prisma.knowledgeConcept.findFirst({
      where: {
        id: id.toString(),
        userId,
      },
    });
    return doc ? ConceptMapper.toDomain(doc) : null;
  }

  async delete(id: ConceptId, userId: string): Promise<void> {
    const result = await this.prisma.knowledgeConcept.deleteMany({
      where: {
        id: id.toString(),
        userId,
      },
    });
    if (result.count === 0) {
      throw new NotFoundException('Concept not found');
    }
  }
}
export const PrismaConceptRepositoryProvider = {
  provide: 'ConceptRepository',
  useClass: PrismaConceptRepository,
};
