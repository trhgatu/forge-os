import {
  IsArray,
  IsDateString,
  IsOptional,
  IsString,
  MinLength,
  IsInt,
  Min,
  Max,
} from 'class-validator';

export class CreateMoodDto {
  @IsString()
  @MinLength(1)
  mood!: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  intensity?: number;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsDateString()
  loggedAt?: string;
}
