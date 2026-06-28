import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTaskCommand } from './delete-task.command';
import { TasksRepository } from '../../../domain/tasks.repository';
import { NotFoundException, Inject } from '@nestjs/common';
import { TaskId } from '../../../domain/value-objects/task-id.vo';

@CommandHandler(DeleteTaskCommand)
export class DeleteTaskHandler implements ICommandHandler<DeleteTaskCommand> {
  constructor(
    @Inject('TasksRepository')
    private readonly repository: TasksRepository,
  ) {}

  async execute(command: DeleteTaskCommand) {
    const { userId, id } = command;
    const tId = TaskId.fromString(id);

    const task = await this.repository.findById(tId, userId);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    task.softDelete();
    await this.repository.save(task);
    return task;
  }
}
