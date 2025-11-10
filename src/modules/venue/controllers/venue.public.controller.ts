import { Controller, Get, Param, Query } from '@nestjs/common';
import { VenueService } from '../venue.service';
import { QueryVenueDto } from '../dtos';

@Controller('venues')
export class VenuePublicController {
  constructor(private readonly venueService: VenueService) {}

  @Get()
  findAll(@Query() query: QueryVenueDto) {
    return this.venueService.findAllForPublic(query);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.venueService.findPublicById(id);
  }
}
