import { IsString, IsOptional, IsArray, IsEnum } from 'class-validator';
import { QuoteStatus } from '@shared/enums';
import { IsI18nString } from '@shared/validators/is-i18n-string';

export class UpdateQuoteDto {
  @IsOptional()
  @IsI18nString()
  content?: any;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  source?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsEnum(QuoteStatus)
  status?: QuoteStatus;
}
