export class DeleteDeckCommand {
  constructor(
    public readonly id: string,
    public readonly userId: string,
  ) {}
}
