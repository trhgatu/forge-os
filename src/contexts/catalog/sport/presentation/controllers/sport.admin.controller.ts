// presentation/controllers/sport.admin.controller.ts

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
import { Permissions } from '@shared/decorators';
import { PermissionEnum } from '@shared/enums';
import {
  CreateSportDto,
  QuerySportDto,
  UpdateSportDto,
} from '@modules/sport/dtos';
import {
  CreateSportCommand,
  UpdateSportCommand,
  DeleteSportCommand,
  SoftDeleteSportCommand,
  RestoreSportCommand,
} from '../../application/commands';
import {
  GetAllSportsQuery,
  GetSportByIdQuery,
} from '../../application/queries';

import { JwtAuthGuard } from '@modules/auth/guards';
import { PermissionsGuard } from '@shared/guards/permissions.guard';
import { SportId } from '../../domain/value-objects/sport-id.vo';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('admin/sports')
export class SportAdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Permissions(PermissionEnum.CREATE_SPORT)
  create(@Body() dto: CreateSportDto) {
    return this.commandBus.execute(new CreateSportCommand(dto));
  }

  @Get()
  @Permissions(PermissionEnum.READ_SPORT)
  findAll(@Query() query: QuerySportDto) {
    return this.queryBus.execute(new GetAllSportsQuery(query));
  }

  @Get(':id')
  @Permissions(PermissionEnum.READ_SPORT)
  findById(@Param('id') id: string) {
    return this.queryBus.execute(new GetSportByIdQuery(SportId.create(id)));
  }

  @Patch(':id')
  @Permissions(PermissionEnum.UPDATE_SPORT)
  update(@Param('id') id: string, @Body() dto: UpdateSportDto) {
    return this.commandBus.execute(
      new UpdateSportCommand(SportId.create(id), dto),
    );
  }

  @Delete(':id')
  @Permissions(PermissionEnum.DELETE_SPORT)
  delete(@Param('id') id: string, @Query('hard') hard?: 'true') {
    const sportId = SportId.create(id);
    return hard === 'true'
      ? this.commandBus.execute(new DeleteSportCommand(sportId))
      : this.commandBus.execute(new SoftDeleteSportCommand(sportId));
  }

  @Patch(':id/restore')
  @Permissions(PermissionEnum.RESTORE_SPORT)
  restore(@Param('id') id: string) {
    return this.commandBus.execute(new RestoreSportCommand(SportId.create(id)));
  }
}
