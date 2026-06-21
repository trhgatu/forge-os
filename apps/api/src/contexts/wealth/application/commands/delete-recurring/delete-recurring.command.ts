export class DeleteRecurringCommand {
  constructor(
    public readonly id: string,
    public readonly userId: string,
  ) {}
}
