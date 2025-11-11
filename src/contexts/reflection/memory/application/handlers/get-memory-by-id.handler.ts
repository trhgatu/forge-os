import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMemoryByIdQuery } from '../queries/get-memory-by-id.query';
import { Inject, NotFoundException } from '@nestjs/common';
import { MemoryRepository } from '../../application/ports/memory.repository';
import { MemoryResponse } from '../../presentation/dto/memory.response';
import { MemoryPresenter } from '../../presentation/memory.presenter';

@QueryHandler(GetMemoryByIdQuery)
export class GetMemoryByIdHandler implements IQueryHandler<GetMemoryByIdQuery> {
  constructor(
    @Inject('MemoryRepository')
    private readonly memoryRepo: MemoryRepository,
  ) {}

  async execute(query: GetMemoryByIdQuery): Promise<MemoryResponse> {
    const { id, lang } = query;

    const memory = await this.memoryRepo.findById(id);
    if (!memory) throw new NotFoundException('Memory not found');

    return MemoryPresenter.toResponse(memory, lang);
  }
}
