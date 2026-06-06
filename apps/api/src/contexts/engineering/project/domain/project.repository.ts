import { Project } from './entities/project.entity';
import { ProjectId } from './value-objects/project-id.vo';
import { PaginatedResult } from '@shared/types/paginated-result';
import { ProjectFilter } from '../application/queries/project-filter';

export abstract class ProjectRepository {
  abstract save(project: Project): Promise<void>;
  abstract findById(id: ProjectId): Promise<Project | null>;
  abstract findAll(filter: ProjectFilter): Promise<PaginatedResult<Project>>;
  abstract delete(id: ProjectId): Promise<void>;
}
