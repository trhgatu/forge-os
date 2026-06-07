export class UpdateRoutineCommand {
  constructor(
    public readonly userId: string,
    public readonly id: string,
    public readonly title: string,
  ) {}
}
