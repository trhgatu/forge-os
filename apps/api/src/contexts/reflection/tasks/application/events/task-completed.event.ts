export class TaskCompletedEvent {
  constructor(
    public readonly userId: string,
    public readonly taskId: string,
  ) {}
}
