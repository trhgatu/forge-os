export class DeleteConceptCommand {
  constructor(
    public readonly id: string,
    public readonly userId: string,
  ) {}
}
