import { z } from 'zod';
import { QuoteStatus } from '@shared/enums';

export const QuoteQuerySchema = z.object({
  page: z
    .preprocess((val) => Number(val), z.number().min(1))
    .optional()
    .default(1),
  limit: z
    .preprocess((val) => Number(val), z.number().min(1).max(100))
    .optional()
    .default(10),
  search: z.string().optional(),
  status: z.nativeEnum(QuoteStatus).optional(),
  author: z.string().optional(),
  tags: z
    .string()
    .transform((val) => val.split(','))
    .optional(),
});

export type QuoteQueryRequest = z.infer<typeof QuoteQuerySchema>;
