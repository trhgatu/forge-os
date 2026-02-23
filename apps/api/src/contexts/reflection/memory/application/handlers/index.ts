import { CreateMemoryHandler } from './create-memory.handler';
import { DeleteMemoryHandler } from './delete-memory.handler';
import { RestoreMemoryHandler } from './restore-memory.handler';
import { UpdateMemoryHandler } from './update-memory.handler';
import { SoftDeleteMemoryHandler } from './soft-delete-memory.handler';
import { GetAllMemoriesHandler } from './get-all-memories.handler';
import { GetMemoryByIdHandler } from './get-memory-by-id.handler';
import { GetAllMemoriesForPublicHandler } from './get-all-memories-for-public.handler';
import { GetMemoryByIdForPublicHandler } from './get-memory-by-id-public.handler';
import { InvalidateMemoryCacheHandler } from './invalidate-memory-cache.handler';

export const MemoryHandlers = [
  CreateMemoryHandler,
  UpdateMemoryHandler,
  DeleteMemoryHandler,
  SoftDeleteMemoryHandler,
  RestoreMemoryHandler,

  GetAllMemoriesHandler,
  GetMemoryByIdHandler,
  GetAllMemoriesForPublicHandler,
  GetMemoryByIdForPublicHandler,

  InvalidateMemoryCacheHandler,
];

export * from './create-memory.handler';
export * from './delete-memory.handler';
export * from './restore-memory.handler';
export * from './update-memory.handler';
export * from './soft-delete-memory.handler';
export * from './get-all-memories.handler';
export * from './get-memory-by-id.handler';
export * from './get-all-memories-for-public.handler';
export * from './get-memory-by-id-public.handler';
export * from './invalidate-memory-cache.handler';
