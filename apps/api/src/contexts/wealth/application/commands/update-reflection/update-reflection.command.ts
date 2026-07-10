export class UpdateReflectionCommand {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly reflection: string,
  ) {}
}
