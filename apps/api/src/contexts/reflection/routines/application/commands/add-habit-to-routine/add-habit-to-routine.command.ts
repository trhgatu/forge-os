export class AddHabitToRoutineCommand {
  constructor(
    public readonly userId: string,
    public readonly routineId: string,
    public readonly habitId: string,
    public readonly order: number,
  ) {}
}
