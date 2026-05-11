import { IsEnum, IsOptional, IsString, IsBoolean, IsNumber, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { MoodType } from '@shared/enums';
import { JournalStatus, JournalType } from '../../domain/enums';

export class QueryJournalDto {
  @ApiPropertyOptional({ example: 'DDD' })
  @IsOptional()
  @IsString()
  keyword?: string;

  @ApiPropertyOptional({ enum: JournalStatus, example: JournalStatus.PUBLISHED })
  @IsOptional()
  @IsEnum(JournalStatus)
  status?: JournalStatus;

  @ApiPropertyOptional({ enum: JournalType, example: JournalType.NOTE })
  @IsOptional()
  @IsEnum(JournalType)
  type?: JournalType;

  @ApiPropertyOptional({ enum: MoodType, example: MoodType.HAPPY })
  @IsOptional()
  @IsEnum(MoodType)
  mood?: MoodType;

  @ApiPropertyOptional({ type: [String], example: ['work'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  tags?: string[];

  @ApiPropertyOptional({ enum: ['user', 'ai', 'system'], example: 'user' })
  @IsOptional()
  @IsEnum(['user', 'ai', 'system'])
  source?: 'user' | 'ai' | 'system';

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isDeleted?: boolean;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;
}
