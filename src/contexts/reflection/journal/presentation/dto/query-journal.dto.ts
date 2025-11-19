import {
  IsEnum,
  IsOptional,
  IsString,
  IsBoolean,
  IsNumber,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

import { MoodType } from '@shared/enums';
import { JournalStatus, JournalType } from '../../domain/enums';

export class QueryJournalDto {
  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @IsEnum(JournalStatus)
  status?: JournalStatus;

  @IsOptional()
  @IsEnum(JournalType)
  type?: JournalType;

  @IsOptional()
  @IsEnum(MoodType)
  mood?: MoodType;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  tags?: string[];

  @IsOptional()
  @IsEnum(['user', 'ai', 'system'])
  source?: 'user' | 'ai' | 'system';

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
}
