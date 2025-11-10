// src/modules/booking/dtos/create-booking.dto.ts
import { IsNotEmpty, IsMongoId, IsDateString } from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  @IsMongoId()
  courtId!: string;

  @IsNotEmpty()
  @IsDateString()
  startTime!: Date;

  @IsNotEmpty()
  @IsDateString()
  endTime!: Date;
}
