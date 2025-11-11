import {
  IsEnum,
  IsOptional,
  IsString,
  IsBoolean,
  IsNumber,
  IsArray,
} from 'class-validator';
import { QuoteStatus } from '@shared/enums';
import { Type } from 'class-transformer';

export class QueryQuoteDto {
  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @IsEnum(QuoteStatus)
  status?: QuoteStatus;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  source?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  tags?: string[];

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isDeleted?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsString()
  lang?: string;
}
