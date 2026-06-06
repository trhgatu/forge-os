import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetAllHabitsQuery } from './get-all-habits.query';
import { HabitsRepository } from '../../../domain/habits.repository';
import { Habit } from '../../../domain/habit.entity';

@QueryHandler(GetAllHabitsQuery)
export class GetAllHabitsHandler implements IQueryHandler<GetAllHabitsQuery, Habit[]> {
  constructor(private readonly repository: HabitsRepository) {}

  async execute(query: GetAllHabitsQuery): Promise<Habit[]> {
    return this.repository.findAllHabits(query.userId);
  }
}
