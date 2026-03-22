export class QuoteModifiedEvent {
  constructor(
    public readonly quoteId: string,
    public readonly action:
      | 'create'
      | 'update'
      | 'delete'
      | 'restore'
      | 'soft-delete'
      | 'hard-delete',
  ) {}
}
