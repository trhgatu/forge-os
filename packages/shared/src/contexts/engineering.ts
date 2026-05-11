import { z } from 'zod';

export const ProjectStatusSchema = z.enum(['active', 'archived', 'pending']);

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  repositoryUrl: z.string().url(),
  status: ProjectStatusSchema,
  lastSyncAt: z.date().or(z.string().datetime()),
});

export type ProjectDto = z.infer<typeof ProjectSchema>;
export type ProjectStatus = z.infer<typeof ProjectStatusSchema>;
