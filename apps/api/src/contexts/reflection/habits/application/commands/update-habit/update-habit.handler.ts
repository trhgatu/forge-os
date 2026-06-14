import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateHabitCommand } from './update-habit.command';
import { HabitsRepository } from '../../../domain/habits.repository';
import { Habit } from '../../../domain/habit.entity';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(UpdateHabitCommand)
export class UpdateHabitHandler implements ICommandHandler<UpdateHabitCommand> {
  constructor(private readonly repository: HabitsRepository) {}

  async execute(command: UpdateHabitCommand): Promise<Habit> {
    const { userId, id, title, description, difficulty, xpReward, actionType } = command;

    const habit = await this.repository.findHabitById(id, userId);
    if (!habit) {
      throw new NotFoundException('Habit ritual not found');
    }

    if (title !== undefined) habit.title = title;
    if (description !== undefined) habit.description = description ?? null;
    if (difficulty !== undefined) habit.difficulty = difficulty;
    if (xpReward !== undefined) habit.xpReward = xpReward;
    if (actionType !== undefined) habit.actionType = actionType ?? null;

    await this.repository.saveHabit(habit);
    return habit;
  }
}
