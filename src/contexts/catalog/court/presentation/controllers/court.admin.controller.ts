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
  CreateCourtDto,
  QueryCourtDto,
  UpdateCourtDto,
} from '@modules/court/dtos';
import {
  CreateCourtCommand,
  UpdateCourtCommand,
  DeleteCourtCommand,
  SoftDeleteCourtCommand,
  RestoreCourtCommand,
} from '../../application/commands';

import {
  GetAllCourtsQuery,
  GetCourtByIdQuery,
} from '../../application/queries';

import { JwtAuthGuard } from '@modules/auth/guards';
import { PermissionsGuard } from '@shared/guards/permissions.guard';
import { CourtId } from '../../domain/value-objects/court-id.vo';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('admin/courts')
export class CourtAdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Permissions(PermissionEnum.CREATE_COURT)
  create(@Body() dto: CreateCourtDto) {
    return this.commandBus.execute(new CreateCourtCommand(dto));
  }

  @Get()
  @Permissions(PermissionEnum.READ_COURT)
  findAll(@Query() query: QueryCourtDto) {
    return this.queryBus.execute(new GetAllCourtsQuery(query));
  }

  @Get(':id')
  @Permissions(PermissionEnum.READ_COURT)
  findById(@Param('id') id: string) {
    return this.queryBus.execute(new GetCourtByIdQuery(CourtId.create(id)));
  }

  @Patch(':id')
  @Permissions(PermissionEnum.UPDATE_COURT)
  update(@Param('id') id: string, @Body() dto: UpdateCourtDto) {
    return this.commandBus.execute(
      new UpdateCourtCommand(CourtId.create(id), dto),
    );
  }

  @Delete(':id')
  @Permissions(PermissionEnum.DELETE_COURT)
  delete(@Param('id') id: string, @Query('hard') hard?: 'true') {
    const courtId = CourtId.create(id);
    return hard === 'true'
      ? this.commandBus.execute(new DeleteCourtCommand(courtId))
      : this.commandBus.execute(new SoftDeleteCourtCommand(courtId));
  }

  @Patch(':id/restore')
  @Permissions(PermissionEnum.RESTORE_COURT)
  restore(@Param('id') id: string) {
    return this.commandBus.execute(new RestoreCourtCommand(CourtId.create(id)));
  }
}
