export class DeleteHabitCommand {
  constructor(
    public readonly userId: string,
    public readonly id: string,
  ) {}
}
