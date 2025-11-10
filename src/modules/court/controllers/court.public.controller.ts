import { Controller, Get, Param, Query } from '@nestjs/common';
import { CourtService } from '../court.service';
import { QueryCourtDto } from '../dtos';

@Controller('courts')
export class CourtPublicController {
  constructor(private readonly courtService: CourtService) {}

  @Get()
  findAll(@Query() query: QueryCourtDto) {
    return this.courtService.findAllForPublic(query);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.courtService.findPublicById(id);
  }
}
