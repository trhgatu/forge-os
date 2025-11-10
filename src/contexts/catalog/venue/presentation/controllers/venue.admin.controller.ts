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
  CreateVenueDto,
  QueryVenueDto,
  UpdateVenueDto,
} from '@modules/venue/dtos';
import {
  CreateVenueCommand,
  UpdateVenueCommand,
  DeleteVenueCommand,
  SoftDeleteVenueCommand,
  RestoreVenueCommand,
} from '../../application/commands';
import {
  GetAllVenuesQuery,
  GetVenueByIdQuery,
} from '../../application/queries';

import { JwtAuthGuard } from '@modules/auth/guards';
import { PermissionsGuard } from '@shared/guards/permissions.guard';
import { VenueId } from '../../domain/value-objects/venue-id.vo';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('admin/venues')
export class VenueAdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Permissions(PermissionEnum.CREATE_VENUE)
  create(@Body() dto: CreateVenueDto) {
    return this.commandBus.execute(new CreateVenueCommand(dto));
  }

  @Get()
  @Permissions(PermissionEnum.READ_VENUE)
  findAll(@Query() query: QueryVenueDto) {
    return this.queryBus.execute(new GetAllVenuesQuery(query));
  }

  @Get(':id')
  @Permissions(PermissionEnum.READ_VENUE)
  findById(@Param('id') id: string) {
    return this.queryBus.execute(new GetVenueByIdQuery(VenueId.create(id)));
  }

  @Patch(':id')
  @Permissions(PermissionEnum.UPDATE_VENUE)
  update(@Param('id') id: string, @Body() dto: UpdateVenueDto) {
    return this.commandBus.execute(
      new UpdateVenueCommand(VenueId.create(id), dto),
    );
  }

  @Delete(':id')
  @Permissions(PermissionEnum.DELETE_VENUE)
  delete(@Param('id') id: string, @Query('hard') hard?: 'true') {
    const venueId = VenueId.create(id);
    return hard === 'true'
      ? this.commandBus.execute(new DeleteVenueCommand(venueId))
      : this.commandBus.execute(new SoftDeleteVenueCommand(venueId));
  }

  @Patch(':id/restore')
  @Permissions(PermissionEnum.RESTORE_VENUE)
  restore(@Param('id') id: string) {
    return this.commandBus.execute(new RestoreVenueCommand(VenueId.create(id)));
  }
}
