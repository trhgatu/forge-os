import { ZodSchema } from 'zod';

export function UseZod(schema: ZodSchema) {
  return <T extends { new (...args: any[]): any }>(target: T): T | void => {
    (target as any)['zodSchema'] = schema;
    return target;
  };
}
