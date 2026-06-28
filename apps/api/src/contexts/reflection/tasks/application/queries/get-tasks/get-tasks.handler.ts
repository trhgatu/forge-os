import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTasksQuery } from './get-tasks.query';
import { TasksRepository } from '../../../domain/tasks.repository';
import { Inject } from '@nestjs/common';

@QueryHandler(GetTasksQuery)
export class GetTasksHandler implements IQueryHandler<GetTasksQuery> {
  constructor(
    @Inject('TasksRepository')
    private readonly repository: TasksRepository,
  ) {}

  async execute(query: GetTasksQuery) {
    const { userId } = query;
    return this.repository.findAll(userId);
  }
}
