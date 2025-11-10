import { z, ZodType } from 'zod';

export const TestStatusEnum = z.enum(['active', 'inactive']);

export const createTestSchema: ZodType<{
  name: string;
  status?: 'active' | 'inactive';
}> = z.object({
  name: z.string().min(1),
  status: TestStatusEnum.optional(),
});

export type CreateTestInput = z.infer<typeof createTestSchema>;
