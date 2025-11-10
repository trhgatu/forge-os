import { Controller, Get, Param, Query } from '@nestjs/common';
import { QueryVenueDto } from '@modules/venue/dtos';
import {
  GetVenueByIdForPublicQuery,
  GetAllVenuesForPublicQuery,
} from '../../application/queries';
import { VenueId } from '../../domain/value-objects/venue-id.vo';
import { QueryBus } from '@nestjs/cqrs';

@Controller('venues')
export class VenuePublicController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  findAll(@Query() query: QueryVenueDto) {
    return this.queryBus.execute(new GetAllVenuesForPublicQuery(query));
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.queryBus.execute(
      new GetVenueByIdForPublicQuery(VenueId.create(id)),
    );
  }
}
