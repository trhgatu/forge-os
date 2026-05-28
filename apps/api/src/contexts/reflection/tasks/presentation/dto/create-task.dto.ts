import { IsString, IsNotEmpty, IsOptional, IsEnum, IsInt, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ description: 'The title of the task', example: 'Refactor Auth Layer' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiPropertyOptional({
    description: 'Optional description of the action items',
    example: 'Clean up JWT strategy and refresh flow',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Priority level of the task',
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  })
  @IsEnum(['low', 'medium', 'high'])
  @IsOptional()
  priority?: 'low' | 'medium' | 'high';

  @ApiPropertyOptional({ description: 'XP reward when task is cleared', example: 15, default: 15 })
  @IsInt()
  @IsOptional()
  xpReward?: number;

  @ApiPropertyOptional({ description: 'Optional deadline date-time' })
  @IsDateString()
  @IsOptional()
  dueDate?: string;
}
