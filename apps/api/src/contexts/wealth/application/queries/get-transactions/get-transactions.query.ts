export interface GetTransactionsFilters {
  accountId?: string;
  type?: string;
  categoryType?: string;
}

export class GetTransactionsQuery {
  constructor(
    public readonly userId: string,
    public readonly filters?: GetTransactionsFilters,
  ) {}
}
