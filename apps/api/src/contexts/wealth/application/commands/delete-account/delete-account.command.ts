export class DeleteAccountCommand {
  constructor(
    public readonly id: string,
    public readonly userId: string,
  ) {}
}
