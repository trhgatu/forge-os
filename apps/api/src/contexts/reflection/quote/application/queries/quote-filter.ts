import { QuoteStatus } from '@shared/enums';

export interface QuoteFilter {
  search?: string;
  status?: QuoteStatus;
  tags?: string[];
  author?: string;
  mood?: string;
  isDeleted?: boolean;
  page?: number;
  limit?: number;
}
