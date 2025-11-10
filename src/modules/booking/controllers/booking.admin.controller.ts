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
import { BookingService } from '../booking.service';
import {
  AdminCreateBookingDto,
  QueryBookingDto,
  UpdateBookingDto,
} from '@modules/booking/dtos';
import { PermissionsGuard } from '@shared/guards/permissions.guard';
import { Permissions } from '@shared/decorators';
import { JwtAuthGuard } from '@modules/auth/guards';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('admin/bookings')
export class BookingAdminController {
  constructor(private readonly bookingService: BookingService) {}

  @Permissions(PermissionEnum.CREATE_BOOKING)
  @Post()
  create(@Body() dto: AdminCreateBookingDto) {
    return this.bookingService.create(dto, dto.userId);
  }

  @Permissions(PermissionEnum.READ_BOOKING)
  @Get()
  findAll(@Query() query: QueryBookingDto) {
    return this.bookingService.findAll(query);
  }

  @Permissions(PermissionEnum.READ_BOOKING)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.bookingService.findById(id);
  }

  @Permissions(PermissionEnum.UPDATE_BOOKING)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBookingDto) {
    return this.bookingService.update(id, dto);
  }

  @Permissions(PermissionEnum.DELETE_BOOKING)
  @Delete(':id')
  delete(@Param('id') id: string, @Query('hard') hard?: 'true') {
    return hard === 'true'
      ? this.bookingService.hardDelete(id)
      : this.bookingService.softDelete(id);
  }

  @Permissions(PermissionEnum.RESTORE_BOOKING)
  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.bookingService.restore(id);
  }
}
