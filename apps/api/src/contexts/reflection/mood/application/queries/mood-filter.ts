import { IsOptional, IsString, IsInt, Min, Max, IsBoolean, IsArray, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class MoodFilter {
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
  limit?: number = 10;

  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @IsString()
  mood?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  from?: Date | string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  to?: Date | string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isDeleted?: boolean = false;
}
