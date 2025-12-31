import { Types } from 'mongoose';
import { Project as ProjectEntity } from '../../domain/project.entity';
import { ProjectDocument } from '../project.schema';
import {
  GithubRepoDetails,
  ProjectLink,
  ProjectLog,
  ProjectTaskBoard,
} from '../../domain/project.interfaces';

export class ProjectMapper {
  static toDomain(doc: ProjectDocument): ProjectEntity {
    // Determine the ID: if available as string or ObjectId or { $oid: ... } legacy import
    let id = (doc as any)._id;
    if (typeof id === 'object' && id && '$oid' in id) {
      id = (id as any).$oid;
    } else {
      id = id.toString();
    }

    // Force casting for complex objects that suffer from Schema vs Domain inconsistencies
    // especially Date vs String in nested objects or Enum strictness
    const githubStats = doc.githubStats as unknown as GithubRepoDetails;
    const taskBoard = doc.taskBoard as unknown as ProjectTaskBoard;
    const links = (doc.links || []) as unknown as ProjectLink[];
    const logs = (doc.logs || []) as unknown as ProjectLog[];

    return ProjectEntity.createFromPersistence({
      id,
      title: doc.title,
      description: doc.description,
      status: doc.status as any, // Cast to match Domain Status Enum if needed
      tags: doc.tags || [],
      isPinned: doc.isPinned || false,
      githubStats: githubStats || {},
      metadata: doc.metadata || {},
      progress: doc.progress || 0,
      taskBoard: taskBoard || { todo: [], inProgress: [], done: [] },
      links: links || [],
      logs: logs || [],
      createdAt: (doc as any).createdAt || new Date(),
      updatedAt: (doc as any).updatedAt || new Date(),
      isDeleted: (doc as any).isDeleted || false,
      deletedAt: (doc as any).deletedAt,
    });
  }

  static toPersistence(entity: ProjectEntity): Partial<ProjectDocument> {
    const props = entity.toPersistence();
    return {
      _id: new Types.ObjectId(entity.id.toString()),
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
    } as any;
  }
}
