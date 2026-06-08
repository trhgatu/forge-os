export class GetTaskByIdQuery {
  constructor(
    public readonly userId: string,
    public readonly id: string,
  ) {}
}
