import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateMemoryDto, UpdateMemoryDto, QueryMemoryDto } from '../dto';
import {
  CreateMemoryCommand,
  UpdateMemoryCommand,
  DeleteMemoryCommand,
  SoftDeleteMemoryCommand,
  RestoreMemoryCommand,
} from '../../application/commands';
import { GetAllMemoriesQuery, GetMemoryByIdQuery } from '../../application/queries';
import { MemoryId } from '../../domain/value-objects/memory-id.vo';
import { JwtAuthGuard } from 'src/contexts/iam/auth/application/guards';
import { PermissionsGuard } from '@shared/guards/permissions.guard';
import { Permissions, User } from '@shared/decorators';
import { PermissionEnum } from '@shared/enums';
import { MemoryPresenter } from '../presenters/memory.presenter';
import { Memory } from '../../domain/memory.entity';
import { PaginatedResult } from '@shared/types/paginated-result';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('admin/memories')
export class MemoryAdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly presenter: MemoryPresenter,
  ) {}

  @Post()
  @Permissions(PermissionEnum.CREATE_MEMORY)
  async create(
    @Body() dto: CreateMemoryDto,
    @User('id') userId: string,
    @Query('lang') lang?: string,
  ) {
    const memory = (await this.commandBus.execute(
      new CreateMemoryCommand({ ...dto, userId }, lang ?? 'en'),
    )) as Memory;
    return this.presenter.toResponse(memory, lang ?? 'en');
  }

  @Get()
  @Permissions(PermissionEnum.READ_MEMORY)
  async findAll(@Query() query: QueryMemoryDto) {
    const result: PaginatedResult<Memory> = await this.queryBus.execute(
      new GetAllMemoriesQuery({
        page: query.page,
        limit: query.limit,
        keyword: query.keyword,
        status: query.status,
        mood: query.mood,
        tags: query.tags,
        isDeleted: query.isDeleted,
      }),
    );

    return {
      meta: result.meta,
      data: result.data.map((m) => this.presenter.toResponse(m, query.lang ?? 'en')),
    };
  }

  @Get(':id')
  @Permissions(PermissionEnum.READ_MEMORY)
  async findById(@Param('id') id: string, @Query('lang') lang?: string) {
    const memory: Memory = await this.queryBus.execute(
      new GetMemoryByIdQuery(MemoryId.create(id), lang ?? 'en'),
    );
    return this.presenter.toResponse(memory, lang ?? 'en');
  }

  @Patch(':id')
  @Permissions(PermissionEnum.UPDATE_MEMORY)
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateMemoryDto,
    @User('id') userId: string,
    @Query('lang') lang?: string,
  ) {
    const memory = (await this.commandBus.execute(
      new UpdateMemoryCommand(MemoryId.create(id), { ...dto, userId }, lang ?? 'en'),
    )) as Memory;
    return this.presenter.toResponse(memory, lang ?? 'en');
  }

  @Delete(':id')
  @Permissions(PermissionEnum.DELETE_MEMORY)
  async delete(
    @Param('id') id: string,
    @Query('hard') hard?: 'true',
    @Query('lang') lang?: string,
  ) {
    const memoryId = MemoryId.create(id);
    if (hard === 'true') {
      await this.commandBus.execute(new DeleteMemoryCommand(memoryId));
      return { success: true };
    }
    const memory = (await this.commandBus.execute(new SoftDeleteMemoryCommand(memoryId))) as Memory;
    return this.presenter.toResponse(memory, lang ?? 'en');
  }

  @Patch(':id/restore')
  @Permissions(PermissionEnum.RESTORE_MEMORY)
  async restore(@Param('id') id: string, @Query('lang') lang?: string) {
    const memory = (await this.commandBus.execute(
      new RestoreMemoryCommand(MemoryId.create(id)),
    )) as Memory;
    return this.presenter.toResponse(memory, lang ?? 'en');
  }
}
