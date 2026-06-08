import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { UpdateTaskCommand } from './update-task.command';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { TaskCompletedEvent } from '../../events/task-completed.event';

@CommandHandler(UpdateTaskCommand)
export class UpdateTaskHandler implements ICommandHandler<UpdateTaskCommand> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateTaskCommand) {
    const { userId, id, dto } = command;

    const task = await this.prisma.task.findFirst({
      where: {
        id,
        userId,
        isDeleted: false,
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const isMarkingCompleted = dto.status === 'done' && task.status !== 'done';
    const isMarkingUncompleted =
      dto.status !== undefined && dto.status !== 'done' && task.status === 'done';
    const completedAt = isMarkingCompleted ? new Date() : isMarkingUncompleted ? null : undefined;

    const updatedTask = await this.prisma.task.update({
      where: { id },
      data: {
        title: dto.title !== undefined ? dto.title : undefined,
        description: dto.description !== undefined ? dto.description : undefined,
        priority: dto.priority !== undefined ? dto.priority : undefined,
        status: dto.status !== undefined ? dto.status : undefined,
        xpReward: dto.xpReward !== undefined ? dto.xpReward : undefined,
        dueDate:
          dto.dueDate !== undefined ? (dto.dueDate ? new Date(dto.dueDate) : null) : undefined,
        completedAt: completedAt !== undefined ? completedAt : undefined,
      },
    });

    if (isMarkingCompleted) {
      this.eventBus.publish(new TaskCompletedEvent(userId, updatedTask.id));
    }

    return updatedTask;
  }
}
