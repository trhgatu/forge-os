import { AggregateRoot } from '@nestjs/cqrs';
import {
  ProjectLink,
  ProjectTaskBoard,
  GithubRepoDetails,
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
    public createdAt: Date,
    public updatedAt: Date,
  ) {
    super();
  }

  // Domain behavior methods can go here, e.g. updateProgress(), pin(), etc.
}
