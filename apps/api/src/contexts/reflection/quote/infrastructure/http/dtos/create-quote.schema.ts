import { z } from 'zod';
import { QuoteStatus, MoodType } from '@shared/enums';
import { ContentSchema } from './content.schema';

export const CreateQuoteSchema = z.object({
  content: ContentSchema,
  author: z.string().optional(),
  source: z.string().url({ message: 'Source must be a valid URL.' }).optional().or(z.literal('')),
  tags: z.array(z.string()).optional().default([]),
  mood: z.nativeEnum(MoodType).optional().default(MoodType.FOCUSED),
  status: z.nativeEnum(QuoteStatus).optional().default(QuoteStatus.INTERNAL),
});
