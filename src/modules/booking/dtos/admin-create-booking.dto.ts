import { IsNotEmpty, IsMongoId, IsDateString } from 'class-validator';

export class AdminCreateBookingDto {
  @IsNotEmpty()
  @IsMongoId()
  userId!: string;

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
