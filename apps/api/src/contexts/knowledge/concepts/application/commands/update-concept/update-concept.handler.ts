import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { UpdateConceptCommand } from './update-concept.command';
import { ConceptRepository } from '../../../domain/concept.repository';
import { Concept } from '../../../domain/concept.entity';
import { ConceptId } from '../../../domain/value-objects/concept-id.vo';

@CommandHandler(UpdateConceptCommand)
export class UpdateConceptHandler implements ICommandHandler<UpdateConceptCommand, Concept> {
  constructor(
    @Inject('ConceptRepository')
    private readonly conceptRepo: ConceptRepository,
  ) {}

  async execute(command: UpdateConceptCommand): Promise<Concept> {
    const { payload } = command;
    const conceptId = ConceptId.fromString(payload.id);

    const concept = await this.conceptRepo.findById(conceptId, payload.userId);
    if (!concept) {
      throw new NotFoundException('Không tìm thấy khái niệm tri thức.');
    }

    concept.updateContent({
      title: payload.title,
      content: payload.content,
      summary: payload.summary,
    });

    await this.conceptRepo.save(concept);
    return concept;
  }
}
