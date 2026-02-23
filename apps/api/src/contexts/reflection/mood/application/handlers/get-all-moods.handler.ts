import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllMoodsQuery } from '../queries';
import { Inject } from '@nestjs/common';
import { MoodRepository } from '../ports/mood.repository';
import { MoodPresenter } from '../../presentation/mood.presenter';
import { PaginatedResult } from '@shared/types/paginated-result';
import { MoodResponse } from '../../presentation/dto/mood.response';

@QueryHandler(GetAllMoodsQuery)
export class GetAllMoodsHandler implements IQueryHandler<
  GetAllMoodsQuery,
  PaginatedResult<MoodResponse>
> {
  constructor(
    @Inject('MoodRepository')
    private readonly moodRepo: MoodRepository,
  ) {}

  async execute(query: GetAllMoodsQuery): Promise<PaginatedResult<MoodResponse>> {
    const result = await this.moodRepo.findAll(query.filter);
    return {
      meta: result.meta,
      data: result.data.map(MoodPresenter.toResponse),
    };
  }
}
