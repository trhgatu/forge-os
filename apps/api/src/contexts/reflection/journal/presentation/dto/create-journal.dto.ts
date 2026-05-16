import { IsString, IsOptional, IsArray, IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { MoodType } from '@shared/enums';
import { JournalStatus, JournalType, JournalRelationType, JournalSource } from '../../domain/enums';

export class JournalRelationDto {
  @ApiProperty({ enum: JournalRelationType, example: JournalRelationType.TASK })
  @IsEnum(JournalRelationType)
  type!: JournalRelationType;

  @ApiProperty({ example: 'task-id-123' })
  @IsString()
  id!: string;
}

export class CreateJournalDto {
  @ApiPropertyOptional({ example: 'My Daily Reflection' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ example: 'Today I felt great and learned a lot about DDD...' })
  @IsString()
  content!: string;

  @ApiPropertyOptional({ enum: MoodType, example: MoodType.HAPPY })
  @IsOptional()
  @IsEnum(MoodType)
  mood?: MoodType;

  @ApiPropertyOptional({ type: [String], example: ['work', 'learning'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ enum: JournalType, example: JournalType.NOTE })
  @IsOptional()
  @IsEnum(JournalType)
  type?: JournalType;

  @ApiPropertyOptional({ enum: JournalStatus, example: JournalStatus.PUBLISHED })
  @IsOptional()
  @IsEnum(JournalStatus)
  status?: JournalStatus;

  @ApiPropertyOptional({ enum: JournalSource, example: JournalSource.USER })
  @IsOptional()
  @IsEnum(JournalSource)
  source?: JournalSource;

  @ApiPropertyOptional({ type: [JournalRelationDto] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => JournalRelationDto)
  relations?: JournalRelationDto[];
}
