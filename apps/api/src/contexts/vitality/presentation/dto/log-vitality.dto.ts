import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsObject } from 'class-validator';

export class LogVitalityDto {
  @ApiProperty({
    example: 'HYDRATION',
    description: 'Type of physical activity: HYDRATION, SLEEP, WORKOUT, CAFFEINE, STEPS',
  })
  @IsString()
  readonly type!: string;

  @ApiProperty({ example: 250, description: 'Numeric value associated with the action' })
  @IsNumber()
  readonly value!: number;

  @ApiProperty({
    example: { quality: 5 },
    description: 'Additional metadata JSON structure',
    required: false,
  })
  @IsOptional()
  @IsObject()
  readonly metadata?: any;
}
