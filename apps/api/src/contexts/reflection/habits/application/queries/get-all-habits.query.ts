import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { HabitsRepository } from '../../domain/habits.repository';
import { Habit } from '../../domain/habit.entity';

export class GetAllHabitsQuery {
  constructor(public readonly userId: string) {}
}

@QueryHandler(GetAllHabitsQuery)
export class GetAllHabitsHandler implements IQueryHandler<GetAllHabitsQuery> {
  constructor(private readonly repository: HabitsRepository) {}

  async execute(query: GetAllHabitsQuery): Promise<Habit[]> {
    return this.repository.findAllHabits(query.userId);
  }
}
