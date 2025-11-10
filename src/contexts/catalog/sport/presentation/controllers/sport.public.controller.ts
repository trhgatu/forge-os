// presentation/controllers/sport.public.controller.ts

import { Controller, Get, Param, Query } from '@nestjs/common';
import { QuerySportDto } from '@modules/sport/dtos';
import {
  GetSportByIdForPublicQuery,
  GetAllSportsForPublicQuery,
} from '../../application/queries';
import { SportId } from '../../domain/value-objects/sport-id.vo';
import { QueryBus } from '@nestjs/cqrs';

@Controller('sports')
export class SportPublicController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  findAll(@Query() query: QuerySportDto) {
    return this.queryBus.execute(new GetAllSportsForPublicQuery(query));
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.queryBus.execute(
      new GetSportByIdForPublicQuery(SportId.create(id)),
    );
  }
}
