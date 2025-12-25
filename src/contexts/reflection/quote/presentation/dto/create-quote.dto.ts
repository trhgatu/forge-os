import { IsString, IsOptional, IsArray, IsEnum } from 'class-validator';
import { QuoteStatus } from '@shared/enums';
import { IsI18nString } from '@shared/validators';

export class CreateQuoteDto {
  @IsI18nString()
  content: any;

  @IsOptional()
  author?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  source?: string;

  @IsOptional()
  mood?: string;

  @IsOptional()
  @IsEnum(QuoteStatus)
  status?: QuoteStatus;
}
