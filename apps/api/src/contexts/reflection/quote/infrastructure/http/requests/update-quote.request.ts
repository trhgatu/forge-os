import { z } from 'zod';
import { CreateQuoteSchema } from './create-quote.request';

export const UpdateQuoteSchema = CreateQuoteSchema.partial();

export type UpdateQuoteRequest = z.infer<typeof UpdateQuoteSchema>;
