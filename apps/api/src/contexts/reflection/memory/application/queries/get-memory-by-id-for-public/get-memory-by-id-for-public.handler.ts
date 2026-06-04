import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMemoryByIdForPublicQuery } from './get-memory-by-id-for-public.query';
import { Inject, NotFoundException } from '@nestjs/common';
import { MemoryRepository } from '../../../domain/memory.repository';
import { Memory } from '../../../domain/memory.entity';

@QueryHandler(GetMemoryByIdForPublicQuery)
export class GetMemoryByIdForPublicHandler implements IQueryHandler<
  GetMemoryByIdForPublicQuery,
  Memory
> {
  constructor(
    @Inject('MemoryRepository')
    private readonly memoryRepo: MemoryRepository,
  ) {}

  async execute(query: GetMemoryByIdForPublicQuery): Promise<Memory> {
    const { id } = query;
    const memory = await this.memoryRepo.findById(id);

    if (!memory || memory.isMemoryDeleted) {
      throw new NotFoundException('Memory not found');
    }

    return memory;
  }
}
