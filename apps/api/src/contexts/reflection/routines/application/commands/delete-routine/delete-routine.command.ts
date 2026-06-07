export class DeleteRoutineCommand {
  constructor(
    public readonly userId: string,
    public readonly id: string,
  ) {}
}
