export class CreateProjectCommand {
  constructor(
    public readonly title: string,
    public readonly description?: string,
  ) {}
}
