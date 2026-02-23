import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMemoryByIdForPublicQuery } from '../queries/get-memory-by-id-public.query';
import { Inject, NotFoundException } from '@nestjs/common';
import { MemoryRepository } from '../../application/ports/memory.repository';
import { MemoryResponse } from '../../presentation/dto/memory.response';
import { MemoryPresenter } from '../../presentation/memory.presenter';

@QueryHandler(GetMemoryByIdForPublicQuery)
export class GetMemoryByIdForPublicHandler
  implements IQueryHandler<GetMemoryByIdForPublicQuery, MemoryResponse>
{
  constructor(
    @Inject('MemoryRepository')
    private readonly memoryRepo: MemoryRepository,
  ) {}

  async execute(query: GetMemoryByIdForPublicQuery): Promise<MemoryResponse> {
    const { id, lang } = query;
    const memory = await this.memoryRepo.findById(id);

    if (!memory || memory.isMemoryDeleted) {
      throw new NotFoundException('Memory not found');
    }

    return MemoryPresenter.toResponse(memory, lang);
  }
}
