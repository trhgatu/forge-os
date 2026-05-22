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
}
