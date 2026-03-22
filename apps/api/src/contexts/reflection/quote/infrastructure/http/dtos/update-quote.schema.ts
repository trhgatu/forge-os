import { CreateQuoteSchema } from './create-quote.schema';

export const UpdateQuoteSchema = CreateQuoteSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: 'At least one field must be provided for update' },
);
