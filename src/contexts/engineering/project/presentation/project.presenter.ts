import { Project } from '../domain/project.entity';
import { ProjectResponse } from './dto/project.response';
// import * as crypto from 'crypto';

export class ProjectPresenter {
  static toResponse(entity: Project): ProjectResponse {
    return {
      id: entity.id.toString(),
      title: entity.title,
      description: entity.description,
      status: entity.status,
      tags: entity.tags,
      isPinned: entity.isPinned,
      githubStats: entity.githubStats,
      metadata: entity.metadata,
      progress: entity.progress,
      taskBoard: entity.taskBoard,
      links: entity.links,
      logs: entity.logs.map((log, index) => ({
        ...log,
        id:
          log.id ||
          (log as any)._id?.toString() ||
          `log-${index}-${new Date(log.date).getTime()}`,
      })),
      createdAt: new Date(entity.createdAt).toISOString(),
      updatedAt: new Date(entity.updatedAt).toISOString(),
      isDeleted: entity.isProjectDeleted,
      deletedAt: entity.deletedDate
        ? new Date(entity.deletedDate).toISOString()
        : null,

      // Frontend Compatibility
      technologies: entity.metadata?.technologies as string[],
      currentMilestone: entity.metadata?.currentMilestone as any,
      dueDate: entity.metadata?.dueDate as string,
      team: entity.metadata?.team as any,
      lead: entity.metadata?.lead as any,
    };
  }
}
