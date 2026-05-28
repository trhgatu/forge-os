import { IsString, IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddHabitToRoutineDto {
  @ApiProperty({ description: 'The UUID of the habit to associate' })
  @IsString()
  @IsNotEmpty()
  habitId!: string;

  @ApiProperty({ description: 'Order of execution (starts at 1)' })
  @IsInt()
  @IsNotEmpty()
  order!: number;
}
