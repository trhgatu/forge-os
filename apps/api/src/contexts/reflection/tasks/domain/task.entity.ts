import { AggregateRoot } from '../../../../shared/domain/aggregate-root.base';
import { TaskId } from './value-objects/task-id.vo';
import { TaskCompletedEvent } from '../application/events/task-completed.event';

export interface TaskProps {
  userId: string;
  title: string;
  description: string | null;
  status: string; // 'todo', 'in_progress', 'done'
  priority: string; // 'low', 'medium', 'high'
  xpReward: number;
  dueDate: Date | null;
  completedAt: Date | null;
  isDeleted: boolean;
  deletedAt: Date | null;
  createdBy: string | null;
  updatedBy: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class Task extends AggregateRoot<TaskId> {
  private constructor(
    id: TaskId,
    private props: TaskProps,
  ) {
    super(id);
  }

  static create(
    data: Omit<
      TaskProps,
      | 'status'
      | 'priority'
      | 'xpReward'
      | 'dueDate'
      | 'completedAt'
      | 'isDeleted'
      | 'deletedAt'
      | 'createdBy'
      | 'updatedBy'
      | 'createdAt'
      | 'updatedAt'
    > & {
      status?: string;
      priority?: string;
      xpReward?: number;
      dueDate?: Date | null;
      completedAt?: Date | null;
      isDeleted?: boolean;
      deletedAt?: Date | null;
      createdBy?: string | null;
      updatedBy?: string | null;
      createdAt?: Date;
      updatedAt?: Date;
    },
    id: TaskId,
  ): Task {
    const now = new Date();
    const task = new Task(id, {
      userId: data.userId,
      title: data.title,
      description: data.description ?? null,
      status: data.status ?? 'todo',
      priority: data.priority ?? 'medium',
      xpReward: data.xpReward ?? 15,
      dueDate: data.dueDate ?? null,
      completedAt: data.completedAt ?? null,
      isDeleted: data.isDeleted ?? false,
      deletedAt: data.deletedAt ?? null,
      createdBy: data.createdBy ?? data.userId,
      updatedBy: data.updatedBy ?? null,
      createdAt: data.createdAt ?? now,
      updatedAt: data.updatedAt ?? now,
    });

    task.addDomainEvent({ type: 'task.created', id: id.value, userId: data.userId });
    return task;
  }

  static createFromPersistence(props: TaskProps, id: string): Task {
    return new Task(TaskId.fromString(id), props);
  }

  // Getters
  get userId(): string {
    return this.props.userId;
  }

  get title(): string {
    return this.props.title;
  }

  get description(): string | null {
    return this.props.description;
  }

  get status(): string {
    return this.props.status;
  }

  get priority(): string {
    return this.props.priority;
  }

  get xpReward(): number {
    return this.props.xpReward;
  }

  get dueDate(): Date | null {
    return this.props.dueDate;
  }

  get completedAt(): Date | null {
    return this.props.completedAt;
  }

  get isDeleted(): boolean {
    return this.props.isDeleted;
  }

  get deletedAt(): Date | null {
    return this.props.deletedAt;
  }

  get createdBy(): string | null {
    return this.props.createdBy;
  }

  get updatedBy(): string | null {
    return this.props.updatedBy;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  // Domain behaviors
  update(
    data: Partial<Omit<TaskProps, 'userId' | 'createdAt' | 'updatedAt' | 'completedAt'>>,
  ): void {
    this.props = {
      ...this.props,
      ...data,
      updatedAt: new Date(),
    };
  }

  complete(): void {
    if (this.props.status === 'done') return;
    const now = new Date();
    this.props.status = 'done';
    this.props.completedAt = now;
    this.props.updatedAt = now;

    this.addDomainEvent(new TaskCompletedEvent(this.props.userId, this.id.value));
  }

  softDelete(): void {
    if (this.props.isDeleted) return;
    const now = new Date();
    this.props.isDeleted = true;
    this.props.deletedAt = now;
    this.props.updatedAt = now;
  }

  toPersistence(): TaskProps {
    return { ...this.props };
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      ...this.props,
    };
  }
}
