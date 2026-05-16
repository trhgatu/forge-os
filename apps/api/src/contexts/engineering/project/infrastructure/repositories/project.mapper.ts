import { Project } from '../../domain/entities/project.entity';

export class ProjectMapper {
  static toDomain(doc: any): Project {
    const id = doc.id;

    return Project.createFromPersistence({
      id: id,
      title: doc.title,
      description: doc.description,
      status: doc.status,
      tags: doc.tags || [],
      isPinned: doc.isPinned || false,
      githubStats: doc.githubStats || {},
      metadata: doc.metadata || {},
      progress: doc.progress || 0,
      taskBoard: doc.taskBoard || { todo: [], inProgress: [], done: [] },
      links: doc.links || [],
      logs: doc.logs || [],
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      isDeleted: doc.isDeleted || false,
      deletedAt: doc.deletedAt,
    });
  }

  static toPersistence(entity: Project): any {
    const props = entity.toPersistence();
    return {
      id: entity.id.toString(),
      title: props.title,
      description: props.description,
      status: props.status,
      tags: props.tags,
      isPinned: props.isPinned,
      githubStats: props.githubStats,
      metadata: props.metadata,
      progress: props.progress,
      taskBoard: props.taskBoard,
      links: props.links,
      logs: props.logs,
      isDeleted: props.isDeleted,
      deletedAt: props.deletedAt,
    };
  }
}
