import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { RoutinesRepository } from '../../domain/routines.repository';
import { Routine } from '../../domain/routine.entity';

export class GetAllRoutinesQuery {
  constructor(public readonly userId: string) {}
}

@QueryHandler(GetAllRoutinesQuery)
export class GetAllRoutinesHandler implements IQueryHandler<GetAllRoutinesQuery> {
  constructor(private readonly repository: RoutinesRepository) {}

  async execute(query: GetAllRoutinesQuery): Promise<Routine[]> {
    return this.repository.findAll(query.userId);
  }
}
