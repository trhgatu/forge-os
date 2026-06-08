export class CreateRoutineCommand {
  constructor(
    public readonly userId: string,
    public readonly title: string,
    public readonly comboXp: number | undefined,
    public readonly targetTime?: string,
    public readonly frequency?: any,
  ) {}
}
