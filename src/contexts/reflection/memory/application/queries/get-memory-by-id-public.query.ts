import { MemoryId } from '../../domain/value-objects/memory-id.vo';

export class GetMemoryByIdForPublicQuery {
  constructor(
    public readonly id: MemoryId,
    public readonly lang: string = 'en',
  ) {}
}
