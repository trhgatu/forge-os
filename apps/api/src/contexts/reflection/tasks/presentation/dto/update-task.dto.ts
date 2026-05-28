import { IsString, IsOptional, IsEnum, IsInt, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiPropertyOptional({ description: 'The title of the task' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ description: 'Optional description of the action items' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Priority level of the task',
    enum: ['low', 'medium', 'high'],
  })
  @IsEnum(['low', 'medium', 'high'])
  @IsOptional()
  priority?: 'low' | 'medium' | 'high';

  @ApiPropertyOptional({
    description: 'State status of the task',
    enum: ['todo', 'in_progress', 'done'],
  })
  @IsEnum(['todo', 'in_progress', 'done'])
  @IsOptional()
  status?: 'todo' | 'in_progress' | 'done';

  @ApiPropertyOptional({ description: 'XP reward when task is cleared' })
  @IsInt()
  @IsOptional()
  xpReward?: number;

  @ApiPropertyOptional({ description: 'Optional deadline date-time' })
  @IsDateString()
  @IsOptional()
  dueDate?: string;
}
