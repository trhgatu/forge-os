import { z } from 'zod';

export const ContentSchema = z
  .record(z.string(), z.string())
  .refine((obj) => Object.keys(obj).length > 0, {
    message: 'Content must contain at least one language translation.',
  });
