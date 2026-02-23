import { IsOptional, IsInt, Min, IsString, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryTimelineDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  limit?: number = 20;

  @IsOptional()
  @IsString()
  lang?: string;
}
