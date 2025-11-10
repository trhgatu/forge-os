// src/modules/booking/dtos/update-booking.dto.ts
import { IsOptional, IsEnum } from 'class-validator';
import { BookingStatus } from '@shared/enums';

export class UpdateBookingDto {
  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;
}
