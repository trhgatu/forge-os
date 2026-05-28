import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { CreateTaskDto, UpdateTaskDto } from '../presentation/dto';
import { IncrementObjectiveProgressCommand } from '../../../gamification/quests/application/commands/increment-objective-progress.command';

@Injectable()
export class TasksService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly commandBus: CommandBus,
  ) {}

  async createTask(userId: string, dto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        userId,
        title: dto.title,
        description: dto.description,
        priority: dto.priority || 'medium',
        xpReward: dto.xpReward ?? 15,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : null,
      },
    });
  }

  async getTasks(userId: string) {
    return this.prisma.task.findMany({
      where: {
        userId,
        isDeleted: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getTaskById(userId: string, id: string) {
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

    return task;
  }

  async updateTask(userId: string, id: string, dto: UpdateTaskDto) {
    const task = await this.getTaskById(userId, id);

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
      await this.commandBus.execute(
        new IncrementObjectiveProgressCommand(userId, 'COMPLETE_TASK', 1, updatedTask.id),
      );
    }

    return updatedTask;
  }

  async deleteTask(userId: string, id: string) {
    await this.getTaskById(userId, id);

    return this.prisma.task.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });
  }
}
