export class HabitCompletedEvent {
  constructor(
    public readonly userId: string,
    public readonly habitId: string,
    public readonly xpReward: number,
    public readonly completedAt: Date,
  ) {}
}
