import {
  IsOptional,
  IsString,
  IsBoolean,
  IsNumber,
  IsArray,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class QueryProjectDto {
  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  tags?: string[];

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  isDeleted?: boolean;

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  isPinned?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;
}
