import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskPresenter {
  toResponse(task: {
    id: string;
    userId: string;
    title: string;
    description: string | null;
    priority: string;
    status: string;
    xpReward: number;
    dueDate: Date | string | null;
    completedAt: Date | string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
  }) {
    return {
      id: task.id,
      userId: task.userId,
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      xpReward: task.xpReward,
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString() : null,
      completedAt: task.completedAt ? new Date(task.completedAt).toISOString() : null,
      createdAt: new Date(task.createdAt).toISOString(),
      updatedAt: new Date(task.updatedAt).toISOString(),
    };
  }

  toResponseArray(tasks: any[]) {
    return tasks.map((task) => this.toResponse(task));
  }
}
