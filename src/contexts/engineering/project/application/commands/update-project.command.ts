import { ProjectId } from '../../domain/value-objects/project-id.vo';
import { ProjectLink, ProjectTaskBoard } from '../../domain/project.interfaces';

export interface UpdateProjectPayload {
  title?: string;
  description?: string;
  status?: string;
  tags?: string[];
  isPinned?: boolean;
  progress?: number;
  links?: ProjectLink[];
  taskBoard?: ProjectTaskBoard;
}

export class UpdateProjectCommand {
  constructor(
    public readonly id: ProjectId,
    public readonly payload: UpdateProjectPayload,
  ) {}
}
