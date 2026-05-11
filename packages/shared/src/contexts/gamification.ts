import { z } from 'zod';

export const UserStatsSchema = z.object({
  userId: z.string(),
  xp: z.number().min(0),
  level: z.number().min(1),
  title: z.string(),
  streak: z.number().min(0),
  lastActivityDate: z.date().or(z.string().datetime()),
  achievements: z.array(z.string()),
});

export const XpAwardedEventSchema = z.object({
  xp: z.number().positive(),
  newLevel: z.number().min(1),
  reason: z.string(),
});

export type UserStatsDto = z.infer<typeof UserStatsSchema>;
export type XpAwardedEventDto = z.infer<typeof XpAwardedEventSchema>;
