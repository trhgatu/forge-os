export class UpdateRoutineCommand {
  constructor(
    public readonly userId: string,
    public readonly id: string,
    public readonly title: string,
    public readonly comboXp?: number,
    public readonly targetTime?: string | null,
    public readonly frequency?: any | null,
  ) {}
}
