import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetAllRoutinesQuery } from './get-all-routines.query';
import { RoutinesRepository } from '../../../domain/routines.repository';
import { Routine } from '../../../domain/routine.entity';

@QueryHandler(GetAllRoutinesQuery)
export class GetAllRoutinesHandler implements IQueryHandler<GetAllRoutinesQuery, Routine[]> {
  constructor(private readonly repository: RoutinesRepository) {}

  async execute(query: GetAllRoutinesQuery): Promise<Routine[]> {
    return this.repository.findAll(query.userId);
  }
}
