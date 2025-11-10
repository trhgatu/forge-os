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
import { PermissionEnum } from '@shared/enums';
import { VenueService } from '../venue.service';
import {
  CreateVenueDto,
  QueryVenueDto,
  UpdateVenueDto,
} from '@modules/venue/dtos';
import { PermissionsGuard } from '@shared/guards/permissions.guard';
import { Permissions } from '@shared/decorators';
import { JwtAuthGuard } from '@modules/auth/guards';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('admin/venues')
export class VenueAdminController {
  constructor(private readonly venueService: VenueService) {}

  @Permissions(PermissionEnum.CREATE_VENUE)
  @Post()
  create(@Body() dto: CreateVenueDto) {
    return this.venueService.create(dto);
  }

  @Permissions(PermissionEnum.READ_VENUE)
  @Get()
  findAll(@Query() query: QueryVenueDto) {
    return this.venueService.findAll(query);
  }

  @Permissions(PermissionEnum.READ_VENUE)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.venueService.findById(id);
  }

  @Permissions(PermissionEnum.UPDATE_VENUE)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateVenueDto) {
    return this.venueService.update(id, dto);
  }

  @Permissions(PermissionEnum.DELETE_VENUE)
  @Delete(':id')
  delete(@Param('id') id: string, @Query('hard') hard?: 'true') {
    return hard === 'true'
      ? this.venueService.hardDelete(id)
      : this.venueService.softDelete(id);
  }

  @Permissions(PermissionEnum.RESTORE_VENUE)
  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.venueService.restore(id);
  }
}
