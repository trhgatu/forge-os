import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTaskByIdQuery } from './get-task-by-id.query';
import { TasksRepository } from '../../../domain/tasks.repository';
import { NotFoundException, Inject } from '@nestjs/common';
import { TaskId } from '../../../domain/value-objects/task-id.vo';

@QueryHandler(GetTaskByIdQuery)
export class GetTaskByIdHandler implements IQueryHandler<GetTaskByIdQuery> {
  constructor(
    @Inject('TasksRepository')
    private readonly repository: TasksRepository,
  ) {}

  async execute(query: GetTaskByIdQuery) {
    const { userId, id } = query;
    const tId = TaskId.fromString(id);

    const task = await this.repository.findById(tId, userId);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }
}
