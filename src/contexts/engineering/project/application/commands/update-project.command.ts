import { ProjectLink, ProjectTaskBoard } from '../../domain/project.interfaces';

export class UpdateProjectCommand {
  constructor(
    public readonly id: string,
    public readonly data: {
      title?: string;
      description?: string;
      status?: string;
      tags?: string[];
      isPinned?: boolean;
      progress?: number;
      links?: ProjectLink[];
      taskBoard?: ProjectTaskBoard;
    },
  ) {}
}
