export class ProjectCreatedEvent {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly title: string,
    public readonly timestamp: Date,
  ) {}
}
