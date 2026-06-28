import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateHabitCommand } from './update-habit.command';
import { HabitsRepository } from '../../../domain/habits.repository';
import { Habit } from '../../../domain/habit.entity';
import { NotFoundException } from '@nestjs/common';
import { HabitId } from '../../../domain/value-objects/habit-id.vo';

@CommandHandler(UpdateHabitCommand)
export class UpdateHabitHandler implements ICommandHandler<UpdateHabitCommand> {
  constructor(private readonly repository: HabitsRepository) {}

  async execute(command: UpdateHabitCommand): Promise<Habit> {
    const { userId, id, title, description, difficulty, xpReward, actionType } = command;
    const hId = HabitId.fromString(id);

    const habit = await this.repository.findHabitById(hId, userId);
    if (!habit) {
      throw new NotFoundException('Habit ritual not found');
    }

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (difficulty !== undefined) updateData.difficulty = difficulty;
    if (xpReward !== undefined) updateData.xpReward = xpReward;
    if (actionType !== undefined) updateData.actionType = actionType;

    habit.update(updateData);

    await this.repository.saveHabit(habit);
    return habit;
  }
}
