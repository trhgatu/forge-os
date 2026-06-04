export class DeleteTaskCommand {
  constructor(
    public readonly userId: string,
    public readonly id: string,
  ) {}
}
