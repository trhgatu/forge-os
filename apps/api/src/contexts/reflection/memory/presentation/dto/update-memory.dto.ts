import { IsString, IsOptional, IsArray, IsEnum } from 'class-validator';
import { MemoryStatus, MoodType } from '@shared/enums';
import { IsI18nString } from '@shared/validators/is-i18n-string';

export class UpdateMemoryDto {
  @IsOptional()
  @IsI18nString()
  title?: any;

  @IsOptional()
  @IsI18nString()
  content?: any;

  @IsOptional()
  @IsEnum(MoodType)
  mood?: MoodType;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsEnum(MemoryStatus)
  status?: MemoryStatus;
}
