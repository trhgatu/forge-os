export class DeleteBudgetCommand {
  constructor(
    public readonly id: string,
    public readonly userId: string,
  ) {}
}
