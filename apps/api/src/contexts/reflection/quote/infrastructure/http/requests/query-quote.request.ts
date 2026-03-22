import { z } from 'zod';
import { QuoteQuerySchema } from '../dtos/quote-query.schema';
import { QuoteStatus } from '@shared/enums';

type QuoteQueryType = z.infer<typeof QuoteQuerySchema>;

export class QuoteQueryRequest implements QuoteQueryType {
  page!: number;
  limit!: number;
  search?: string;
  author?: string;
  status?: QuoteStatus;
  tags?: string[];
}
