import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteConceptCommand } from './delete-concept.command';
import { ConceptRepository } from '../../../domain/concept.repository';
import { ConceptId } from '../../../domain/value-objects/concept-id.vo';

@CommandHandler(DeleteConceptCommand)
export class DeleteConceptHandler implements ICommandHandler<
  DeleteConceptCommand,
  { success: boolean }
> {
  constructor(
    @Inject('ConceptRepository')
    private readonly conceptRepo: ConceptRepository,
  ) {}

  async execute(command: DeleteConceptCommand): Promise<{ success: boolean }> {
    const conceptId = ConceptId.fromString(command.id);
    await this.conceptRepo.delete(conceptId, command.userId);
    return { success: true };
  }
}
