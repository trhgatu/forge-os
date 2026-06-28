import { Injectable } from '@nestjs/common';
import { Task } from '../../domain/task.entity';

@Injectable()
export class TaskPresenter {
  toResponse(task: Task) {
    const primitives = task.toPrimitives();
    return {
      id: primitives.id,
      userId: primitives.userId,
      title: primitives.title,
      description: primitives.description,
      priority: primitives.priority,
      status: primitives.status,
      xpReward: primitives.xpReward,
      dueDate: primitives.dueDate ? new Date(primitives.dueDate).toISOString() : null,
      completedAt: primitives.completedAt ? new Date(primitives.completedAt).toISOString() : null,
      createdAt: new Date(primitives.createdAt).toISOString(),
      updatedAt: new Date(primitives.updatedAt).toISOString(),
    };
  }

  toResponseArray(tasks: Task[]) {
    return tasks.map((task) => this.toResponse(task));
  }
}
