import { Controller, Get, Param, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { QueryMoodDto } from '../dto/query-mood.dto';
import { GetAllMoodsQuery, GetMoodByIdQuery } from '../../application/queries';
import { MoodId } from '../../domain/value-objects/mood-id.vo';
import { MoodPresenter } from '../presenters/mood.presenter';
import { Mood } from '../../domain/mood.entity';
import { PaginatedResult } from '@shared/types/paginated-result';

@Controller('moods')
export class MoodPublicController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async findAll(@Query() query: QueryMoodDto) {
    const result: PaginatedResult<Mood> = await this.queryBus.execute(
      new GetAllMoodsQuery({
        page: query.page ? Number(query.page) : undefined,
        limit: query.limit ? Number(query.limit) : undefined,
        tags: query.tags,
        mood: query.mood,
        from: query.from ? new Date(query.from) : undefined,
        to: query.to ? new Date(query.to) : undefined,
        isDeleted: query.isDeleted ? query.isDeleted === 'true' : false,
      }),
    );

    return {
      meta: result.meta,
      data: result.data.map(MoodPresenter.toResponse),
    };
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const mood: Mood = await this.queryBus.execute(new GetMoodByIdQuery(MoodId.create(id)));
    return MoodPresenter.toResponse(mood);
  }
}
