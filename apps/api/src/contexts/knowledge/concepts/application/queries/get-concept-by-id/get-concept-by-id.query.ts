export class GetConceptByIdQuery {
  constructor(
    public readonly id: string,
    public readonly userId: string,
  ) {}
}
