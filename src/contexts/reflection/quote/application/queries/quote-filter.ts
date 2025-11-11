import { QuoteStatus } from '@shared/enums';

export interface QuoteFilter {
  keyword?: string;
  status?: QuoteStatus;
  isDeleted?: boolean;
  source?: string;
  author?: string;
  tags?: string[];
  page?: number;
  limit?: number;
}
