export class ProjectCreatedEvent {
  constructor(
    public readonly id: string,
    public readonly userId: string, // Needed for Gamification
    public readonly title: string,
    public readonly timestamp: Date,
  ) {}
}
