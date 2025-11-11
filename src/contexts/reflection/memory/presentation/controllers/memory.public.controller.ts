import { Controller, Get, Param, Query } from '@nestjs/common';
import { QueryMemoryDto } from '../dto';
import {
  GetAllMemoriesForPublicQuery,
  GetMemoryByIdForPublicQuery,
} from '../../application/queries';
import { MemoryId } from '../../domain/value-objects/memory-id.vo';
import { QueryBus } from '@nestjs/cqrs';

@Controller('memories')
export class MemoryPublicController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  findAll(@Query() query: QueryMemoryDto) {
    return this.queryBus.execute(new GetAllMemoriesForPublicQuery(query));
  }

  @Get(':id')
  findById(@Param('id') id: string, @Query('lang') lang?: string) {
    return this.queryBus.execute(
      new GetMemoryByIdForPublicQuery(MemoryId.create(id), lang ?? 'en'),
    );
  }
}
