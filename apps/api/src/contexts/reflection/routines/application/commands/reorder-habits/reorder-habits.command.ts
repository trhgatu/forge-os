export class ReorderHabitsCommand {
  constructor(
    public readonly userId: string,
    public readonly routineId: string,
    public readonly orders: { habitId: string; order: number }[],
  ) {}
}
