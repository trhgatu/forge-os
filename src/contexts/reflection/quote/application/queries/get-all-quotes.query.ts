import { QuoteStatus } from '@shared/enums';

export class GetAllQuotesQuery {
  constructor(
    public readonly payload: {
      lang?: string;
      page?: number;
      limit?: number;
      keyword?: string;
      status?: QuoteStatus;
      tags?: string[];
      isDeleted?: boolean;
    },
  ) {}
}
