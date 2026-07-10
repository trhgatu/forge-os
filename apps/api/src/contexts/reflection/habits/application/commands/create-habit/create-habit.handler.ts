import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateHabitCommand } from './create-habit.command';
import { HabitsRepository } from '../../../domain/habits.repository';
import { Habit } from '../../../domain/habit.entity';
import { HabitId } from '../../../domain/value-objects/habit-id.vo';

@CommandHandler(CreateHabitCommand)
export class CreateHabitHandler implements ICommandHandler<CreateHabitCommand> {
  constructor(private readonly repository: HabitsRepository) {}

  async execute(command: CreateHabitCommand): Promise<Habit> {
    const { userId, title, description, xpReward, difficulty, frequency, actionType } = command;

    const habit = Habit.create(
      {
        userId,
        title,
        description: description ?? null,
        xpReward,
        difficulty,
        frequency,
        actionType,
      },
      HabitId.create(),
    );

    await this.repository.saveHabit(habit);
    return habit;
  }
}
