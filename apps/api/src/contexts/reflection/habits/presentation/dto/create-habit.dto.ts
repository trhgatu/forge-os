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

  @ApiPropertyOptional({
    description: 'Scheduling frequency configuration',
    example: { type: 'daily' },
  })
  @IsObject()
  @IsOptional()
  frequency?: any;

  @ApiPropertyOptional({
    description: 'The dynamic event action type associated with this habit',
    example: 'CREATE_JOURNAL',
  })
  @IsString()
  @IsOptional()
  actionType?: string;
}
