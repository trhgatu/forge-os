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
import { MemoryPresenter } from '../presenters/memory.presenter';
import { Memory } from '../../domain/memory.entity';
import { PaginatedResult } from '@shared/types/paginated-result';
import { User } from '@shared/decorators';

@Controller('memories')
export class MemoryPublicController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly presenter: MemoryPresenter,
  ) {}

  @Get()
  async findAll(@Query() query: QueryMemoryDto) {
    const result: PaginatedResult<Memory> = await this.queryBus.execute(
      new GetAllMemoriesForPublicQuery({
        page: query.page,
        limit: query.limit,
        keyword: query.keyword,
        status: query.status,
        tags: query.tags,
        mood: query.mood,
        lang: query.lang ?? 'en',
      }),
    );

    return {
      meta: result.meta,
      data: result.data.map((m) => this.presenter.toResponse(m, query.lang ?? 'en')),
    };
  }

  @Get(':id')
  async findById(@Param('id') id: string, @Query('lang') lang?: string) {
    const memory: Memory = await this.queryBus.execute(
      new GetMemoryByIdForPublicQuery(MemoryId.create(id), lang ?? 'en'),
    );
    return this.presenter.toResponse(memory, lang ?? 'en');
  }

  @Post()
  async create(
    @Body() dto: CreateMemoryDto,
    @User('id') userId?: string,
    @Query('lang') lang?: string,
  ) {
    const memory = (await this.commandBus.execute(
      new CreateMemoryCommand({ ...dto, userId }, lang ?? 'en'),
    )) as Memory;
    return this.presenter.toResponse(memory, lang ?? 'en');
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateMemoryDto,
    @User('id') userId?: string,
    @Query('lang') lang?: string,
  ) {
    const memory = (await this.commandBus.execute(
      new UpdateMemoryCommand(MemoryId.create(id), { ...dto, userId }, lang ?? 'en'),
    )) as Memory;
    return this.presenter.toResponse(memory, lang ?? 'en');
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Query('lang') lang?: string) {
    const memory = (await this.commandBus.execute(
      new SoftDeleteMemoryCommand(MemoryId.create(id)),
    )) as Memory;
    return this.presenter.toResponse(memory, lang ?? 'en');
  }
}
