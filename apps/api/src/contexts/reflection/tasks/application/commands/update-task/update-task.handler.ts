import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTaskCommand } from './update-task.command';
import { TasksRepository } from '../../../domain/tasks.repository';
import { NotFoundException, Inject } from '@nestjs/common';
import { TaskId } from '../../../domain/value-objects/task-id.vo';

@CommandHandler(UpdateTaskCommand)
export class UpdateTaskHandler implements ICommandHandler<UpdateTaskCommand> {
  constructor(
    @Inject('TasksRepository')
    private readonly repository: TasksRepository,
  ) {}

  async execute(command: UpdateTaskCommand) {
    const { userId, id, dto } = command;
    const tId = TaskId.fromString(id);

    const task = await this.repository.findById(tId, userId);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const isMarkingCompleted = dto.status === 'done' && task.status !== 'done';

    const updateData: any = {};
    if (dto.title !== undefined) updateData.title = dto.title;
    if (dto.description !== undefined) updateData.description = dto.description;
    if (dto.priority !== undefined) updateData.priority = dto.priority;
    if (dto.status !== undefined) updateData.status = dto.status;
    if (dto.xpReward !== undefined) updateData.xpReward = dto.xpReward;
    if (dto.dueDate !== undefined) updateData.dueDate = dto.dueDate ? new Date(dto.dueDate) : null;

    task.update(updateData);

    if (isMarkingCompleted) {
      task.complete();
    }

    await this.repository.save(task);
    return task;
  }
}
