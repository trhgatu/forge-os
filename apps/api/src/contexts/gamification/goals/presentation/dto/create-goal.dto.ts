import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGoalObjectiveDto {
  @ApiProperty({ example: 'COMPLETE_QUEST', description: 'Objective type (e.g., COMPLETE_QUEST)' })
  @IsString()
  @IsNotEmpty()
  type!: string;

  @ApiProperty({ example: 10, description: 'Target count for completion' })
  @IsNumber()
  @IsNotEmpty()
  targetCount!: number;

  @ApiProperty({
    example: 'quest-daily-meta-alignment',
    description: 'Reference ID of the target Quest (optional)',
    required: false,
  })
  @IsString()
  @IsOptional()
  referenceId?: string;
}

export class CreateGoalDto {
  @ApiProperty({ example: 'Master of Reality', description: 'Title of the Epic Goal' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    example: 'Conquer reality through discipline',
    description: 'Description of the Epic Goal',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 1000,
    description: 'XP Reward upon completing the goal',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  xpReward?: number;

  @ApiProperty({
    example: 'achievement_master_of_reality',
    description: 'Badge Icon and Achievement Key',
    required: false,
  })
  @IsString()
  @IsOptional()
  badgeIcon?: string;

  @ApiProperty({ type: [CreateGoalObjectiveDto], description: 'List of requirements' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateGoalObjectiveDto)
  objectives!: CreateGoalObjectiveDto[];
}
