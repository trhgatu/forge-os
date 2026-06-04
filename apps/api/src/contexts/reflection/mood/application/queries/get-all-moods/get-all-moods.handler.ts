import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllMoodsQuery } from './get-all-moods.query';
import { Inject } from '@nestjs/common';
import { MoodRepository } from '../../../domain/mood.repository';
import { Mood } from '../../../domain/mood.entity';
import { PaginatedResult } from '@shared/types/paginated-result';

@QueryHandler(GetAllMoodsQuery)
export class GetAllMoodsHandler implements IQueryHandler<GetAllMoodsQuery, PaginatedResult<Mood>> {
  constructor(
    @Inject('MoodRepository')
    private readonly moodRepo: MoodRepository,
  ) {}

  async execute(query: GetAllMoodsQuery): Promise<PaginatedResult<Mood>> {
    return this.moodRepo.findAll(query.filter);
  }
}
