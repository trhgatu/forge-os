import { IsString, IsOptional, IsNumber, IsBoolean, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateGoalObjectiveDto } from './create-goal.dto';

export class UpdateGoalDto {
  @ApiPropertyOptional({ example: 'Master of Reality' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ example: 'Conquer reality through discipline' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 1000 })
  @IsNumber()
  @IsOptional()
  xpReward?: number;

  @ApiPropertyOptional({ example: 'achievement_master_of_reality' })
  @IsString()
  @IsOptional()
  badgeIcon?: string;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiPropertyOptional({ type: [CreateGoalObjectiveDto] })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateGoalObjectiveDto)
  objectives?: CreateGoalObjectiveDto[];
}
