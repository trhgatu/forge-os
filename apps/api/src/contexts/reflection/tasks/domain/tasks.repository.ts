import { Task } from './task.entity';
import { TaskId } from './value-objects/task-id.vo';

export abstract class TasksRepository {
  abstract save(task: Task): Promise<void>;
  abstract findById(id: TaskId, userId?: string): Promise<Task | null>;
  abstract findAll(userId: string): Promise<Task[]>;
}
