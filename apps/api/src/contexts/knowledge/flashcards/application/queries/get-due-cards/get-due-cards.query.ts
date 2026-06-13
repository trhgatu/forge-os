export class GetDueCardsQuery {
  constructor(
    public readonly userId: string,
    public readonly deckId?: string,
  ) {}
}
