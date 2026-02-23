import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { QueryMemoryDto, CreateMemoryDto, UpdateMemoryDto } from '../dto';
import {
  GetAllMemoriesForPublicQuery,
  GetMemoryByIdForPublicQuery,
} from '../../application/queries';
import {
  CreateMemoryCommand,
  SoftDeleteMemoryCommand,
  UpdateMemoryCommand,
} from '../../application/commands';
import { MemoryId } from '../../domain/value-objects/memory-id.vo';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@Controller('memories')
export class MemoryPublicController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

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

  // Public create to support frontend without auth; can be moved behind guard later
  @Post()
  create(@Body() dto: CreateMemoryDto) {
    const lang = 'en';
    return this.commandBus.execute(new CreateMemoryCommand(dto, lang));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMemoryDto) {
    const lang = 'en';
    return this.commandBus.execute(new UpdateMemoryCommand(MemoryId.create(id), dto, lang));
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    const lang = 'en';
    return this.commandBus.execute(new SoftDeleteMemoryCommand(MemoryId.create(id), lang));
  }
}
