export class ProjectDeletedEvent {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly timestamp: Date,
  ) {}
}
