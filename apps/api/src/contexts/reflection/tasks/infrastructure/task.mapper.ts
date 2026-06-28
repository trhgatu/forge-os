import { Task } from '../domain/task.entity';

export class TaskMapper {
  static toDomain(doc: any): Task | null {
    if (!doc) return null;

    return Task.createFromPersistence(
      {
        userId: doc.userId,
        title: doc.title,
        description: doc.description,
        status: doc.status,
        priority: doc.priority,
        xpReward: doc.xpReward,
        dueDate: doc.dueDate,
        completedAt: doc.completedAt,
        isDeleted: doc.isDeleted || false,
        deletedAt: doc.deletedAt,
        createdBy: doc.createdBy,
        updatedBy: doc.updatedBy,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
      },
      doc.id,
    );
  }

  static toPersistence(entity: Task): any {
    const props = entity.toPersistence();
    return {
      id: entity.id.value,
      userId: props.userId,
      title: props.title,
      description: props.description,
      status: props.status,
      priority: props.priority,
      xpReward: props.xpReward,
      dueDate: props.dueDate,
      completedAt: props.completedAt,
      isDeleted: props.isDeleted,
      deletedAt: props.deletedAt,
      createdBy: props.createdBy,
      updatedBy: props.updatedBy,
    };
  }
}
