import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMemoryByIdQuery } from '../queries/get-memory-by-id.query';
import { Inject, NotFoundException } from '@nestjs/common';
import { MemoryRepository } from '../../application/ports/memory.repository';
import { Memory } from '../../domain/memory.entity';

@QueryHandler(GetMemoryByIdQuery)
export class GetMemoryByIdHandler implements IQueryHandler<GetMemoryByIdQuery, Memory> {
  constructor(
    @Inject('MemoryRepository')
    private readonly memoryRepo: MemoryRepository,
  ) {}

  async execute(query: GetMemoryByIdQuery): Promise<Memory> {
    const { id } = query;

    const memory = await this.memoryRepo.findById(id);
    if (!memory) throw new NotFoundException('Memory not found');

    return memory;
  }
}
