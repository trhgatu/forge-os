import { QuoteStatus } from '@shared/enums';

export interface GetAllQuotesForPublicPayload {
  page?: number;
  limit?: number;
  keyword?: string;
  status?: QuoteStatus;
  tags?: string[];
}

export class GetAllQuotesForPublicQuery {
  constructor(public readonly payload: GetAllQuotesForPublicPayload) {}
}
