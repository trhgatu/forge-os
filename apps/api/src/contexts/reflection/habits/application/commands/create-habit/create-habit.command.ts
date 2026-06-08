export class CreateHabitCommand {
  constructor(
    public readonly userId: string,
    public readonly title: string,
    public readonly description: string | undefined,
    public readonly xpReward: number | undefined,
    public readonly difficulty: string | undefined,
    public readonly frequency: any,
  ) {}
}
