import { z } from 'zod';
import { ContentSchema } from './content.schema';
import { MoodType, QuoteStatus } from '@shared/enums';
export const QuoteBaseSchema = z.object({
  content: ContentSchema,
  author: z.string().optional(),
  source: z.string().url({ message: 'Source must be a valid URL.' }).optional().or(z.literal('')),
  tags: z.array(z.string()).optional(),
  mood: z.nativeEnum(MoodType).optional(),
  status: z.nativeEnum(QuoteStatus).optional(),
});
