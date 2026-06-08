import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteRoutineCommand } from './delete-routine.command';
import { RoutinesRepository } from '../../../domain/routines.repository';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteRoutineCommand)
export class DeleteRoutineHandler implements ICommandHandler<DeleteRoutineCommand> {
  constructor(private readonly repository: RoutinesRepository) {}

  async execute(command: DeleteRoutineCommand): Promise<void> {
    const { userId, id } = command;

    const routine = await this.repository.findById(id, userId);
    if (!routine) {
      throw new NotFoundException('Routine chain not found');
    }

    await this.repository.delete(id, userId);
  }
}
