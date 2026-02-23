import { MemoryId } from '../../domain/value-objects/memory-id.vo';

export class SoftDeleteMemoryCommand {
  constructor(
    public readonly id: MemoryId,
    public readonly lang: string = 'en',
  ) {}
}
