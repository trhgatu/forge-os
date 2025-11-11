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
import {
  GetAllMemoriesQuery,
  GetMemoryByIdQuery,
} from '../../application/queries';
import { MemoryId } from '../../domain/value-objects/memory-id.vo';
import { JwtAuthGuard } from '@modules/auth/guards';
import { PermissionsGuard } from '@shared/guards/permissions.guard';
import { Permissions } from '@shared/decorators';
import { PermissionEnum } from '@shared/enums';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('admin/memories')
export class MemoryAdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Permissions(PermissionEnum.CREATE_MEMORY)
  create(@Body() dto: CreateMemoryDto) {
    return this.commandBus.execute(new CreateMemoryCommand(dto));
  }

  @Get()
  @Permissions(PermissionEnum.READ_MEMORY)
  findAll(@Query() query: QueryMemoryDto) {
    return this.queryBus.execute(new GetAllMemoriesQuery(query));
  }

  @Get(':id')
  @Permissions(PermissionEnum.READ_MEMORY)
  findById(@Param('id') id: string, @Query('lang') lang?: string) {
    return this.queryBus.execute(
      new GetMemoryByIdQuery(MemoryId.create(id), lang ?? 'en'),
    );
  }

  @Patch(':id')
  @Permissions(PermissionEnum.UPDATE_MEMORY)
  update(@Param('id') id: string, @Body() dto: UpdateMemoryDto) {
    return this.commandBus.execute(
      new UpdateMemoryCommand(MemoryId.create(id), dto),
    );
  }

  @Delete(':id')
  @Permissions(PermissionEnum.DELETE_MEMORY)
  delete(@Param('id') id: string, @Query('hard') hard?: 'true') {
    const memoryId = MemoryId.create(id);
    return hard === 'true'
      ? this.commandBus.execute(new DeleteMemoryCommand(memoryId))
      : this.commandBus.execute(new SoftDeleteMemoryCommand(memoryId));
  }

  @Patch(':id/restore')
  @Permissions(PermissionEnum.RESTORE_MEMORY)
  restore(@Param('id') id: string) {
    return this.commandBus.execute(
      new RestoreMemoryCommand(MemoryId.create(id)),
    );
  }
}
