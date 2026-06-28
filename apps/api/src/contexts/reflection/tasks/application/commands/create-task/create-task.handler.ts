import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTaskCommand } from './create-task.command';
import { TasksRepository } from '../../../domain/tasks.repository';
import { Task } from '../../../domain/task.entity';
import { TaskId } from '../../../domain/value-objects/task-id.vo';
import { Inject } from '@nestjs/common';

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(
    @Inject('TasksRepository')
    private readonly repository: TasksRepository,
  ) {}

  async execute(command: CreateTaskCommand) {
    const { userId, dto } = command;

    const task = Task.create(
      {
        userId,
        title: dto.title,
        description: dto.description ?? null,
        priority: dto.priority || 'medium',
        xpReward: dto.xpReward ?? 15,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : null,
      },
      TaskId.create(),
    );

    await this.repository.save(task);
    return task;
  }
}
