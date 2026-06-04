export class CreateRoutineCommand {
  constructor(
    public readonly userId: string,
    public readonly title: string,
    public readonly comboXp: number | undefined,
  ) {}
}
