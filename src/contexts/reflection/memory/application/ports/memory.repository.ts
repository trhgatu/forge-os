import { Memory } from '../../domain/memory.entity';
import { MemoryId } from '../../domain/value-objects/memory-id.vo';
import { PaginatedResult } from '@shared/types/paginated-result';
import { MemoryFilter } from '../queries/memory-filter';

export abstract class MemoryRepository {
  abstract save(memory: Memory): Promise<void>;
  abstract findById(id: MemoryId): Promise<Memory | null>;
  abstract findAll(filter: MemoryFilter): Promise<PaginatedResult<Memory>>;
  abstract delete(id: MemoryId): Promise<void>;
  abstract softDelete(id: MemoryId): Promise<void>;
  abstract restore(id: MemoryId): Promise<void>;
}
