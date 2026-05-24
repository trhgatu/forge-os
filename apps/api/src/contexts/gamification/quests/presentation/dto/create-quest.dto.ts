import { IsString, IsNotEmpty, IsOptional, IsInt, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ObjectiveDto {
  @ApiPropertyOptional({ description: 'Optional Objective UUID' })
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty({ description: 'Action type, e.g. CREATE_JOURNAL, CHECK_HABIT' })
  @IsString()
  @IsNotEmpty()
  type!: string;

  @ApiProperty({ description: 'Number of actions required' })
  @IsInt()
  @IsNotEmpty()
  targetCount!: number;

  @ApiProperty({ description: 'Referenced Entity name, e.g. Journal, Project, Habit' })
  @IsString()
  @IsNotEmpty()
  referenceType!: string;

  @ApiPropertyOptional({ description: 'Specific Entity UUID if targeting a particular item' })
  @IsString()
  @IsOptional()
  referenceId?: string;
}

export class CreateQuestDto {
  @ApiProperty({ description: 'The title of the quest', example: 'Sunset Reflections' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiPropertyOptional({ description: 'Quest detailed instructions' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Quest type: daily, weekly, main, side' })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiPropertyOptional({ description: 'XP reward when quest is fully cleared' })
  @IsInt()
  @IsOptional()
  xpReward?: number;

  @ApiProperty({ type: [ObjectiveDto], description: 'Child objectives to clear' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ObjectiveDto)
  objectives!: ObjectiveDto[];
}
