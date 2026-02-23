import { MemoryId } from '../../domain/value-objects/memory-id.vo';

export class MemoryModifiedEvent {
  constructor(
    public readonly memoryId: MemoryId,
    public readonly action:
      | 'create'
      | 'update'
      | 'delete'
      | 'restore'
      | 'soft-delete',
  ) {}
}
