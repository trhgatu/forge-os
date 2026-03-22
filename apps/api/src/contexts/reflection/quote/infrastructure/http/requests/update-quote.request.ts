import { z } from 'zod';
import { UpdateQuoteSchema } from '../dtos/update-quote.schema';
import { MoodType, QuoteStatus } from '@shared/enums';

type UpdateQuoteType = z.infer<typeof UpdateQuoteSchema>;
export class UpdateQuoteRequest implements UpdateQuoteType {
  content?: UpdateQuoteType['content'];
  author?: string;
  source?: string;
  tags?: string[];
  mood?: MoodType;
  status?: QuoteStatus;
}
