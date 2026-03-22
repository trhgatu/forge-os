import { QuoteBaseSchema } from './quote-base.schema';

export const UpdateQuoteSchema = QuoteBaseSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: 'At least one field must be provided for update' },
);
