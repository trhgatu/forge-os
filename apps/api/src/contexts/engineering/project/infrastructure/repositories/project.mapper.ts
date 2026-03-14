import { Types } from 'mongoose';
import { Project } from '../../domain/project.entity';
import { ProjectDocument } from '../project.schema';
import {
  GithubRepoDetails,
  ProjectLink,
  ProjectLog,
  ProjectTaskBoard,
} from '../../domain/project.interfaces';

export class ProjectMapper {
  static toDomain(doc: ProjectDocument): Project {
    const rawId = doc._id as unknown as Types.ObjectId | { $oid: string } | undefined;
    if (!rawId) throw new Error('Project load failed: Missing _id');

    const id =
      typeof rawId === 'object' && '$oid' in rawId
        ? (rawId as { $oid: string }).$oid
        : rawId.toString();

    return Project.createFromPersistence({
      id,
      title: doc.title,
      description: doc.description,
      status: doc.status,
      tags: doc.tags ?? [],
      isPinned: doc.isPinned ?? false,
      githubStats: (doc.githubStats ?? {}) as unknown as GithubRepoDetails,
      metadata: doc.metadata ?? {},
      progress: doc.progress ?? 0,
      taskBoard: (doc.taskBoard ?? { todo: [], inProgress: [], done: [] }) as ProjectTaskBoard,
      links: (doc.links ?? []) as ProjectLink[],
      logs: (doc.logs ?? []) as ProjectLog[],
      createdAt: doc.createdAt ?? new Date(),
      updatedAt: doc.updatedAt ?? new Date(),
      isDeleted: doc.isDeleted ?? false,
      deletedAt: doc.deletedAt,
    });
  }

  static toPersistence(entity: Project): Partial<ProjectDocument> {
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
    } as unknown as Partial<ProjectDocument>;
  }
}
