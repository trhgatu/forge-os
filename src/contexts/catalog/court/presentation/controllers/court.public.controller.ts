import { Controller, Get, Param, Query } from '@nestjs/common';
import { QueryCourtDto } from '@modules/court/dtos';
import {
  GetCourtByIdForPublicQuery,
  GetAllCourtsForPublicQuery,
} from '../../application/queries';
import { CourtId } from '../../domain/value-objects/court-id.vo';
import { QueryBus } from '@nestjs/cqrs';

@Controller('courts')
export class CourtPublicController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  findAll(@Query() query: QueryCourtDto) {
    return this.queryBus.execute(new GetAllCourtsForPublicQuery(query));
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.queryBus.execute(
      new GetCourtByIdForPublicQuery(CourtId.create(id)),
    );
  }
}
