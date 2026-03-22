import { UseZod } from '@shared/insfrastructure/decorators/zod.decorator';
import { CreateQuoteSchema } from '../dtos/create-quote.schema';
import { MoodType, QuoteStatus } from '@shared/enums';

@UseZod(CreateQuoteSchema)
export class CreateQuoteRequest {
  content!: Record<string, string>;
  author?: string;
  source?: string;
  tags!: string[];
  mood!: MoodType;
  status!: QuoteStatus;
}
