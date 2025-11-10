// src/modules/booking/dtos/query-booking.dto.ts
import { IsOptional, IsEnum, IsMongoId } from 'class-validator';
import { QueryPaginationDto } from '@shared/dtos';
import { BookingStatus } from '@shared/enums';

export class QueryBookingDto extends QueryPaginationDto {
  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;

  @IsOptional()
  @IsMongoId()
  userId?: string;

  @IsOptional()
  @IsMongoId()
  courtId?: string;
}
