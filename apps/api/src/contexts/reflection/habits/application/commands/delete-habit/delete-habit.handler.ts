import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteHabitCommand } from './delete-habit.command';
import { HabitsRepository } from '../../../domain/habits.repository';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteHabitCommand)
export class DeleteHabitHandler implements ICommandHandler<DeleteHabitCommand> {
  constructor(private readonly repository: HabitsRepository) {}

  async execute(command: DeleteHabitCommand): Promise<void> {
    const { userId, id } = command;

    const habit = await this.repository.findHabitById(id, userId);
    if (!habit) {
      throw new NotFoundException('Habit ritual not found');
    }

    await this.repository.deleteHabit(id, userId);
  }
}
