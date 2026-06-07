import { IsArray, ValidateNested, IsString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class HabitOrderDto {
  @ApiProperty()
  @IsString()
  habitId!: string;

  @ApiProperty()
  @IsInt()
  order!: number;
}

export class ReorderHabitsDto {
  @ApiProperty({ type: [HabitOrderDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HabitOrderDto)
  orders!: HabitOrderDto[];
}
