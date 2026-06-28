import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteRoutineCommand } from './delete-routine.command';
import { RoutinesRepository } from '../../../domain/routines.repository';
import { NotFoundException } from '@nestjs/common';
import { RoutineId } from '../../../domain/value-objects/routine-id.vo';

@CommandHandler(DeleteRoutineCommand)
export class DeleteRoutineHandler implements ICommandHandler<DeleteRoutineCommand> {
  constructor(private readonly repository: RoutinesRepository) {}

  async execute(command: DeleteRoutineCommand): Promise<void> {
    const { userId, id } = command;
    const rId = RoutineId.fromString(id);

    const routine = await this.repository.findById(rId, userId);
    if (!routine) {
      throw new NotFoundException('Routine chain not found');
    }

    await this.repository.delete(rId, userId);
  }
}
