import { UseZod } from '@shared/insfrastructure/decorators/zod.decorator';
import { UpdateQuoteSchema } from '../dtos/update-quote.schema';
import { MoodType, QuoteStatus } from '@shared/enums';

@UseZod(UpdateQuoteSchema)
export class UpdateQuoteRequest {
  content?: Record<string, string>;
  author?: string;
  source?: string;
  tags?: string[];
  mood?: MoodType;
  status?: QuoteStatus;
}
