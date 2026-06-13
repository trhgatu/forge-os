import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SaveConceptCommand } from './save-concept.command';
import { ConceptRepository } from '../../../domain/concept.repository';
import { Concept } from '../../../domain/concept.entity';
import { ConceptId } from '../../../domain/value-objects/concept-id.vo';

@CommandHandler(SaveConceptCommand)
export class SaveConceptHandler implements ICommandHandler<SaveConceptCommand, Concept> {
  constructor(
    @Inject('ConceptRepository')
    private readonly conceptRepo: ConceptRepository,
  ) {}

  async execute(command: SaveConceptCommand): Promise<Concept> {
    const { payload } = command;
    const conceptId = ConceptId.random();

    const concept = Concept.create(
      {
        userId: payload.userId,
        title: payload.title,
        sourceType: payload.sourceType,
        sourceUrl: payload.sourceUrl,
        content: payload.content,
        summary: payload.summary,
      },
      conceptId,
    );

    await this.conceptRepo.save(concept);
    return concept;
  }
}
