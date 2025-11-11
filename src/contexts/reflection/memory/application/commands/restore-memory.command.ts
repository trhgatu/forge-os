import { MemoryId } from '../../domain/value-objects/memory-id.vo';

export class RestoreMemoryCommand {
  constructor(
    public readonly id: MemoryId,
    public readonly lang: string = 'en',
  ) {}
}
