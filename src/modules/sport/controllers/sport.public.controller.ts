import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiQuery, ApiParam } from '@nestjs/swagger';
import { SportService } from '../sport.service';
import { QuerySportDto } from '../dtos';

@Controller('sports')
export class SportPublicController {
  constructor(private readonly sportService: SportService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findAll(@Query() query: QuerySportDto) {
    return this.sportService.findAllForPublic(query);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String })
  findById(@Param('id') id: string) {
    return this.sportService.findPublicById(id);
  }
}
