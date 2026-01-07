export class ProjectSyncedEvent {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly githubStats: any,
    public readonly newCommitCount: number,
    public readonly timestamp: Date,
  ) {}
}
