import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateAuditLogDto {
  @IsString()
  action!: string;

  @IsString()
  method!: string;

  @IsNumber()
  statusCode!: number;

  @IsString()
  path!: string;

  @IsOptional()
  params?: any;

  @IsOptional()
  query?: any;

  @IsOptional()
  body?: any;

  @IsOptional()
  user?: any;
}
