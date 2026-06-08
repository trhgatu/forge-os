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
import { Permissions, User } from '@shared/decorators';
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
import { MoodPresenter } from '../presenters/mood.presenter';
import { Mood } from '../../domain/mood.entity';
import { PaginatedResult } from '@shared/types/paginated-result';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('admin/moods')
export class MoodAdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly presenter: MoodPresenter,
  ) {}

  @Post()
  @Permissions(PermissionEnum.CREATE_MOOD)
  async create(@Body() dto: CreateMoodDto, @User('id') userId: string) {
    const mood = (await this.commandBus.execute(new CreateMoodCommand({ ...dto, userId }))) as Mood;
    return this.presenter.toResponse(mood);
  }

  @Get()
  @Permissions(PermissionEnum.READ_MOOD)
  async findAll(@Query() query: QueryMoodDto) {
    const result: PaginatedResult<Mood> = await this.queryBus.execute(
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

    return {
      meta: result.meta,
      data: result.data.map((m) => this.presenter.toResponse(m)),
    };
  }

  @Get(':id')
  @Permissions(PermissionEnum.READ_MOOD)
  async findById(@Param('id') id: string) {
    const mood: Mood = await this.queryBus.execute(new GetMoodByIdQuery(MoodId.create(id)));
    return this.presenter.toResponse(mood);
  }

  @Patch(':id')
  @Permissions(PermissionEnum.UPDATE_MOOD)
  async update(@Param('id') id: string, @Body() dto: UpdateMoodDto, @User('id') userId: string) {
    const mood = (await this.commandBus.execute(
      new UpdateMoodCommand(MoodId.create(id), { ...dto, userId }),
    )) as Mood;
    return this.presenter.toResponse(mood);
  }

  @Delete(':id')
  @Permissions(PermissionEnum.DELETE_MOOD)
  delete(@Param('id') id: string, @Query('hard') hard?: 'true') {
    const moodId = MoodId.create(id);
    return hard === 'true'
      ? this.commandBus.execute(new DeleteMoodCommand(moodId))
      : this.commandBus.execute(new SoftDeleteMoodCommand(moodId));
  }

  @Patch(':id/restore')
  @Permissions(PermissionEnum.RESTORE_MOOD)
  restore(@Param('id') id: string) {
    return this.commandBus.execute(new RestoreMoodCommand(MoodId.create(id)));
  }
}
