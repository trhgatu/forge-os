import { CreateMemoryHandler } from './create-memory/create-memory.handler';
import { UpdateMemoryHandler } from './update-memory/update-memory.handler';
import { DeleteMemoryHandler } from './delete-memory/delete-memory.handler';
import { SoftDeleteMemoryHandler } from './soft-delete-memory/soft-delete-memory.handler';
import { RestoreMemoryHandler } from './restore-memory/restore-memory.handler';

export * from './create-memory/create-memory.command';
export * from './update-memory/update-memory.command';
export * from './delete-memory/delete-memory.command';
export * from './soft-delete-memory/soft-delete-memory.command';
export * from './restore-memory/restore-memory.command';

export const MemoryCommandHandlers = [
  CreateMemoryHandler,
  UpdateMemoryHandler,
  DeleteMemoryHandler,
  SoftDeleteMemoryHandler,
  RestoreMemoryHandler,
];
