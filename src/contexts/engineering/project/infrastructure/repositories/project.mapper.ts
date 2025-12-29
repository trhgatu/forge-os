import { Project as ProjectEntity } from '../../domain/project.entity';
import { ProjectDocument } from '../project.schema';
import {
  GithubRepoDetails,
  ProjectTaskBoard,
  ProjectLink,
  ProjectLog,
} from '../../domain/project.interfaces';

export class ProjectMapper {
  static toDomain(document: ProjectDocument): ProjectEntity {
    const doc = document as unknown as {
      _id: string;
      title: string;
      description: string;
      status: string;
      tags: string[];
      isPinned: boolean;
      githubStats: Partial<GithubRepoDetails>;
      metadata: Record<string, unknown>;
      progress: number;
      taskBoard: ProjectTaskBoard;
      links: ProjectLink[];
      logs: ProjectLog[];
      createdAt: Date;
      updatedAt: Date;
    };
    return new ProjectEntity(
      doc._id.toString(),
      doc.title,
      doc.description,
      doc.status,
      doc.tags,
      doc.isPinned,
      doc.githubStats,
      doc.metadata,
      doc.progress,
      doc.taskBoard,
      doc.links,
      doc.logs,
      doc.createdAt,
      doc.updatedAt,
    );
  }

  static toPersistence(entity: ProjectEntity): Partial<ProjectDocument> {
    return {
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
      logs: entity.logs,
    } as unknown as Partial<ProjectDocument>;
  }
}
