import { MemoryId } from '../../domain/value-objects/memory-id.vo';

export class GetMemoryByIdQuery {
  constructor(
    public readonly id: MemoryId,
    public readonly lang: string = 'en',
  ) {}
}
