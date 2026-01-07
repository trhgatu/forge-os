export class ProjectUpdatedEvent {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly payload: any,
    public readonly timestamp: Date,
  ) {}
}
