export class CompleteHabitCommand {
  constructor(
    public readonly userId: string,
    public readonly habitId: string,
  ) {}
}
