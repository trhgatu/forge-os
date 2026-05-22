import { IsString, IsNotEmpty, IsOptional, IsInt, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateHabitDto {
  @ApiProperty({ description: 'The title of the habit', example: 'Drink Water' })
  @IsString()
  @IsNotEmpty()
  title!: string;

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

  @ApiProperty({ description: 'Scheduling frequency configuration' })
  @IsObject()
  frequency!: any;
}
