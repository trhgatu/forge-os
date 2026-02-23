import { IsString, IsOptional, IsArray, IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { MoodType } from '@shared/enums';
import { JournalStatus, JournalType, JournalRelationType } from '../../domain/enums';

export class JournalRelationDto {
  @IsEnum(JournalRelationType)
  type!: JournalRelationType;

  @IsString()
  id!: string;
}

export class CreateJournalDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsString()
  content!: string;

  @IsOptional()
  @IsEnum(MoodType)
  mood?: MoodType;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsEnum(JournalType)
  type?: JournalType;

  @IsOptional()
  @IsEnum(JournalStatus)
  status?: JournalStatus;

  @IsOptional()
  @IsEnum(['user', 'ai', 'system'])
  source?: 'user' | 'ai' | 'system';

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => JournalRelationDto)
  relations?: JournalRelationDto[];
}
