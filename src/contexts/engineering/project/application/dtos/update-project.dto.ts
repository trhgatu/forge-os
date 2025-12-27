import {
  IsOptional,
  IsString,
  IsArray,
  IsBoolean,
  IsNumber,
  IsObject,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ProjectLinkDto {
  @IsString()
  title!: string;

  @IsString()
  url!: string;

  @IsOptional()
  @IsEnum(['github', 'figma', 'doc', 'link'])
  icon?: 'github' | 'figma' | 'doc' | 'link';
}

export class ProjectTaskDto {
  @IsString()
  id!: string;

  @IsString()
  title!: string;

  @IsEnum(['low', 'medium', 'high'])
  priority!: 'low' | 'medium' | 'high';
}

export class ProjectTaskBoardDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectTaskDto)
  todo!: ProjectTaskDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectTaskDto)
  inProgress!: ProjectTaskDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectTaskDto)
  done!: ProjectTaskDto[];
}

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsBoolean()
  isPinned?: boolean;

  @IsOptional()
  @IsNumber()
  progress?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectLinkDto)
  links?: ProjectLinkDto[];

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => ProjectTaskBoardDto)
  taskBoard?: ProjectTaskBoardDto;
}
