import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRoutineDto {
  @ApiProperty({ description: 'The title of the routine', example: 'Morning Ritual' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiPropertyOptional({ description: 'Combo XP reward when completed' })
  @IsInt()
  @IsOptional()
  comboXp?: number;

  @ApiPropertyOptional({ description: 'Target execution time in HH:mm format', example: '07:00' })
  @IsString()
  @IsOptional()
  targetTime?: string;

  @ApiPropertyOptional({
    description: 'Flexible frequency schedule config',
    example: { days: [1, 2, 3, 4, 5] },
  })
  @IsOptional()
  frequency?: any;
}
