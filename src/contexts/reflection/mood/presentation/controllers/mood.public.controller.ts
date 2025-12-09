import { Controller, Get, Param, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { QueryMoodDto } from '../dto/query-mood.dto';
import { GetAllMoodsQuery, GetMoodByIdQuery } from '../../application/queries';
import { MoodId } from '../../domain/value-objects/mood-id.vo';

@Controller('moods')
export class MoodPublicController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  findAll(@Query() query: QueryMoodDto) {
    return this.queryBus.execute(
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
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.queryBus.execute(new GetMoodByIdQuery(MoodId.create(id)));
  }
}
