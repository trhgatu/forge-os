import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { TasksRepository } from '../domain/tasks.repository';
import { Task } from '../domain/task.entity';
import { TaskId } from '../domain/value-objects/task-id.vo';
import { TaskMapper } from './task.mapper';
import { EventBus } from '@nestjs/cqrs';

@Injectable()
export class PrismaTasksRepository implements TasksRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async save(task: Task): Promise<void> {
    const persistence = TaskMapper.toPersistence(task);
    await this.prisma.task.upsert({
      where: { id: persistence.id },
      update: {
        title: persistence.title,
        description: persistence.description,
        status: persistence.status,
        priority: persistence.priority,
        xpReward: persistence.xpReward,
        dueDate: persistence.dueDate,
        completedAt: persistence.completedAt,
        isDeleted: persistence.isDeleted,
        deletedAt: persistence.deletedAt,
        createdBy: persistence.createdBy,
        updatedBy: persistence.updatedBy,
      },
      create: {
        id: persistence.id,
        userId: persistence.userId,
        title: persistence.title,
        description: persistence.description,
        status: persistence.status,
        priority: persistence.priority,
        xpReward: persistence.xpReward,
        dueDate: persistence.dueDate,
        completedAt: persistence.completedAt,
        isDeleted: persistence.isDeleted,
        deletedAt: persistence.deletedAt,
        createdBy: persistence.createdBy,
        updatedBy: persistence.updatedBy,
      },
    });

    if (task.domainEvents.length > 0) {
      task.domainEvents.forEach((event) => this.eventBus.publish(event));
      task.clearDomainEvents();
    }
  }

  async findById(id: TaskId, userId?: string): Promise<Task | null> {
    const where: any = { id: id.value };
    if (userId) where.userId = userId;

    const doc = await this.prisma.task.findFirst({ where });
    return TaskMapper.toDomain(doc);
  }

  async findAll(userId: string): Promise<Task[]> {
    const docs = await this.prisma.task.findMany({
      where: { userId, isDeleted: false },
      orderBy: { createdAt: 'desc' },
    });

    return docs.map((doc) => TaskMapper.toDomain(doc)).filter((t): t is Task => t !== null);
  }
}
