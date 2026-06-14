import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateHabitCommand } from './create-habit.command';
import { HabitsRepository } from '../../../domain/habits.repository';
import { Habit } from '../../../domain/habit.entity';
import { v4 as uuidv4 } from 'uuid';

@CommandHandler(CreateHabitCommand)
export class CreateHabitHandler implements ICommandHandler<CreateHabitCommand> {
  constructor(private readonly repository: HabitsRepository) {}

  async execute(command: CreateHabitCommand): Promise<Habit> {
    const { userId, title, description, xpReward, difficulty, frequency, actionType } = command;

    const habit = Habit.create({
      id: uuidv4(),
      userId,
      title,
      description,
      xpReward,
      difficulty,
      frequency,
      actionType,
    });

    await this.repository.saveHabit(habit);
    return habit;
  }
}
