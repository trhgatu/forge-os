import { MemoryId } from '../../domain/value-objects/memory-id.vo';

export class DeleteMemoryCommand {
  constructor(public readonly id: MemoryId) {}
}
