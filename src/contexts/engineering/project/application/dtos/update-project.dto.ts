import {
  IsOptional,
  IsString,
  IsArray,
  IsBoolean,
  IsNumber,
  IsObject,
} from 'class-validator';
import { ProjectLink, ProjectTaskBoard } from '../../domain/project.interfaces';

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
  tags?: string[];

  @IsOptional()
  @IsBoolean()
  isPinned?: boolean;

  @IsOptional()
  @IsNumber()
  progress?: number;

  @IsOptional()
  @IsArray()
  links?: ProjectLink[];

  @IsOptional()
  @IsObject()
  taskBoard?: ProjectTaskBoard;
}
