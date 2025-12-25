import { QuoteStatus } from '@shared/enums';

export interface QuoteResponse {
  id: string;
  content: string;
  tags: string[];
  status: QuoteStatus;
  source?: string;
  author?: string;
  mood?: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}
