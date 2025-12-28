import { AggregateRoot } from '@nestjs/cqrs';
import {
  ProjectLink,
  ProjectTaskBoard,
  GithubRepoDetails,
  ProjectLog,
} from './project.interfaces';

export class Project extends AggregateRoot {
  constructor(
    public readonly id: string,
    public title: string,
    public description: string,
    public status: string,
    public tags: string[],
    public isPinned: boolean,
    public githubStats: Partial<GithubRepoDetails>,
    public metadata: Record<string, unknown>,
    public progress: number,
    public taskBoard: ProjectTaskBoard,
    public links: ProjectLink[],
    public logs: ProjectLog[],
    public createdAt: Date,
    public updatedAt: Date,
  ) {
    super();
  }

  // Encapsulate state changes
  update(
    data: Partial<
      Omit<
        Project,
        'id' | 'createdAt' | 'updatedAt' | 'githubStats' | 'metadata'
      >
    >,
  ) {
    if (data.title !== undefined) this.title = data.title;
    if (data.description !== undefined) this.description = data.description;
    if (data.status !== undefined) this.status = data.status;
    if (data.tags !== undefined) this.tags = data.tags;
    if (data.isPinned !== undefined) this.isPinned = data.isPinned;
    if (data.progress !== undefined) this.progress = data.progress;
    if (data.taskBoard !== undefined) this.taskBoard = data.taskBoard;
    if (data.links !== undefined) this.links = data.links;
    this.updatedAt = new Date();
  }
}
