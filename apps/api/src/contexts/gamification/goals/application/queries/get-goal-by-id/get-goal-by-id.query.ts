export class GetGoalByIdQuery {
  constructor(
    public readonly goalId: string,
    public readonly userId?: string,
  ) {}
}
