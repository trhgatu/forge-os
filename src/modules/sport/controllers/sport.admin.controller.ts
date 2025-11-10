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
import { SportService } from '../sport.service';
import {
  CreateSportDto,
  QuerySportDto,
  UpdateSportDto,
} from '@modules/sport/dtos';
import { PermissionsGuard } from '@shared/guards/permissions.guard';
import { Permissions } from '@shared/decorators';
import { JwtAuthGuard } from '@modules/auth/guards';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('admin/sports')
export class SportAdminController {
  constructor(private readonly sportService: SportService) {}

  @Permissions(PermissionEnum.CREATE_SPORT)
  @Post()
  create(@Body() dto: CreateSportDto) {
    return this.sportService.create(dto);
  }

  @Permissions(PermissionEnum.READ_SPORT)
  @Get()
  findAll(@Query() query: QuerySportDto) {
    return this.sportService.findAll(query);
  }

  @Permissions(PermissionEnum.READ_SPORT)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.sportService.findById(id);
  }

  @Permissions(PermissionEnum.UPDATE_SPORT)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSportDto) {
    return this.sportService.update(id, dto);
  }

  @Permissions(PermissionEnum.DELETE_SPORT)
  @Delete(':id')
  delete(@Param('id') id: string, @Query('hard') hard?: boolean) {
    return hard
      ? this.sportService.hardDelete(id)
      : this.sportService.softDelete(id);
  }

  @Permissions(PermissionEnum.RESTORE_SPORT)
  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.sportService.restore(id);
  }
}
