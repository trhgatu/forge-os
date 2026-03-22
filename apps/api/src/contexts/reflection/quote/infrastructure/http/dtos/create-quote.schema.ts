import { QuoteStatus, MoodType } from '@shared/enums';
import { QuoteBaseSchema } from './quote-base.schema';

export const CreateQuoteSchema = QuoteBaseSchema.extend({
  tags: QuoteBaseSchema.shape.tags.default([]),
  mood: QuoteBaseSchema.shape.mood.default(MoodType.FOCUSED),
  status: QuoteBaseSchema.shape.status.default(QuoteStatus.INTERNAL),
}).refine((data) => data.content, { message: 'Content is required' });
