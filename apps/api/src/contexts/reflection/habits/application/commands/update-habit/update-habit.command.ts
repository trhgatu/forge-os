export class UpdateHabitCommand {
  constructor(
    public readonly userId: string,
    public readonly id: string,
    public readonly title?: string,
    public readonly description?: string,
    public readonly difficulty?: string,
    public readonly xpReward?: number,
    public readonly actionType?: string,
  ) {}
}
