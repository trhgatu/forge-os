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
import { JwtAuthGuard } from 'src/contexts/iam/auth/application/guards';
import { PermissionsGuard } from '@shared/guards/permissions.guard';
import { Permissions } from '@shared/decorators';
import { PermissionEnum } from '@shared/enums';
import { CreateMoodDto } from '../dto/create-mood.dto';
import { UpdateMoodDto } from '../dto/update-mood.dto';
import { QueryMoodDto } from '../dto/query-mood.dto';
import {
  CreateMoodCommand,
  UpdateMoodCommand,
  DeleteMoodCommand,
  SoftDeleteMoodCommand,
  RestoreMoodCommand,
} from '../../application/commands';
import { GetAllMoodsQuery, GetMoodByIdQuery } from '../../application/queries';
import { MoodId } from '../../domain/value-objects/mood-id.vo';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('admin/moods')
export class MoodAdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Permissions(PermissionEnum.CREATE_MEMORY)
  create(@Body() dto: CreateMoodDto) {
    return this.commandBus.execute(new CreateMoodCommand(dto));
  }

  @Get()
  @Permissions(PermissionEnum.READ_MEMORY)
  findAll(@Query() query: QueryMoodDto) {
    return this.queryBus.execute(
      new GetAllMoodsQuery({
        page: query.page ? Number(query.page) : undefined,
        limit: query.limit ? Number(query.limit) : undefined,
        tags: query.tags,
        mood: query.mood,
        from: query.from ? new Date(query.from) : undefined,
        to: query.to ? new Date(query.to) : undefined,
        isDeleted: query.isDeleted ? query.isDeleted === 'true' : undefined,
      }),
    );
  }

  @Get(':id')
  @Permissions(PermissionEnum.READ_MEMORY)
  findById(@Param('id') id: string) {
    return this.queryBus.execute(new GetMoodByIdQuery(MoodId.create(id)));
  }

  @Patch(':id')
  @Permissions(PermissionEnum.UPDATE_MEMORY)
  update(@Param('id') id: string, @Body() dto: UpdateMoodDto) {
    return this.commandBus.execute(
      new UpdateMoodCommand(MoodId.create(id), dto),
    );
  }

  @Delete(':id')
  @Permissions(PermissionEnum.DELETE_MEMORY)
  delete(@Param('id') id: string, @Query('hard') hard?: 'true') {
    const moodId = MoodId.create(id);
    return hard === 'true'
      ? this.commandBus.execute(new DeleteMoodCommand(moodId))
      : this.commandBus.execute(new SoftDeleteMoodCommand(moodId));
  }

  @Patch(':id/restore')
  @Permissions(PermissionEnum.RESTORE_MEMORY)
  restore(@Param('id') id: string) {
    return this.commandBus.execute(new RestoreMoodCommand(MoodId.create(id)));
  }
}
