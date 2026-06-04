import { GetAllMemoriesHandler } from './get-all-memories/get-all-memories.handler';
import { GetAllMemoriesForPublicHandler } from './get-all-memories-for-public/get-all-memories-for-public.handler';
import { GetMemoryByIdHandler } from './get-memory-by-id/get-memory-by-id.handler';
import { GetMemoryByIdForPublicHandler } from './get-memory-by-id-for-public/get-memory-by-id-for-public.handler';

export * from './get-all-memories/get-all-memories.query';
export * from './get-all-memories-for-public/get-all-memories-for-public.query';
export * from './get-memory-by-id/get-memory-by-id.query';
export * from './get-memory-by-id-for-public/get-memory-by-id-for-public.query';
export * from './memory-filter';

export const MemoryQueryHandlers = [
  GetAllMemoriesHandler,
  GetAllMemoriesForPublicHandler,
  GetMemoryByIdHandler,
  GetMemoryByIdForPublicHandler,
];
