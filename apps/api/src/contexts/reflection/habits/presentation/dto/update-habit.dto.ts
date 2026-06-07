import { IsString, IsOptional, IsInt } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateHabitDto {
  @ApiPropertyOptional({ description: 'The title of the habit', example: 'Drink Water' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ description: 'Detailed description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'XP reward when checked' })
  @IsInt()
  @IsOptional()
  xpReward?: number;

  @ApiPropertyOptional({ description: 'Habit difficulty' })
  @IsString()
  @IsOptional()
  difficulty?: string;
}
