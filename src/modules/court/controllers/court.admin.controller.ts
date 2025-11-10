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
import { CourtService } from '../court.service';
import {
  CreateCourtDto,
  QueryCourtDto,
  UpdateCourtDto,
} from '@modules/court/dtos';
import { PermissionsGuard } from '@shared/guards/permissions.guard';
import { Permissions } from '@shared/decorators';
import { JwtAuthGuard } from '@modules/auth/guards';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('admin/courts')
export class CourtAdminController {
  constructor(private readonly courtService: CourtService) {}

  @Permissions(PermissionEnum.CREATE_COURT)
  @Post()
  create(@Body() dto: CreateCourtDto) {
    return this.courtService.create(dto);
  }

  @Permissions(PermissionEnum.READ_COURT)
  @Get()
  findAll(@Query() query: QueryCourtDto) {
    return this.courtService.findAll(query);
  }

  @Permissions(PermissionEnum.READ_COURT)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.courtService.findById(id);
  }

  @Permissions(PermissionEnum.UPDATE_COURT)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCourtDto) {
    return this.courtService.update(id, dto);
  }

  @Permissions(PermissionEnum.DELETE_COURT)
  @Delete(':id')
  delete(@Param('id') id: string, @Query('hard') hard?: 'true') {
    return hard === 'true'
      ? this.courtService.hardDelete(id)
      : this.courtService.softDelete(id);
  }

  @Permissions(PermissionEnum.RESTORE_COURT)
  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.courtService.restore(id);
  }
}
