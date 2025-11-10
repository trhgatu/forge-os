// src/modules/booking/controllers/booking.public.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BookingService } from '../booking.service';
import { QueryBookingDto, CreateBookingDto } from '../dtos';
import { JwtAuthGuard } from '@modules/auth/guards';
import { GetUser } from '@modules/auth/decorators/get-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('bookings')
export class BookingPublicController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  create(@Body() dto: CreateBookingDto, @GetUser('_id') userId: string) {
    return this.bookingService.create(dto, userId);
  }

  @Get()
  findAll(@Query() query: QueryBookingDto, @GetUser('_id') userId: string) {
    return this.bookingService.findAllForPublic(query, userId);
  }

  @Get(':id')
  findById(@Param('id') id: string, @GetUser('_id') userId: string) {
    return this.bookingService.findPublicById(id, userId);
  }

  @Patch(':id/cancel')
  cancel(@Param('id') id: string, @GetUser('_id') userId: string) {
    return this.bookingService.cancel(id, userId);
  }
}
