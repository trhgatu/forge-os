import { IsArray, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateMoodDto {
  @IsString()
  @MinLength(1)
  mood!: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  loggedAt?: Date;
}
