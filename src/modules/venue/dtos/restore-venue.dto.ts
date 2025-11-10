// dtos/restore-venue.dto.ts
import { IsOptional, IsBoolean } from 'class-validator';

export class RestoreVenueDto {
  @IsOptional()
  @IsBoolean()
  restore?: boolean;
}
