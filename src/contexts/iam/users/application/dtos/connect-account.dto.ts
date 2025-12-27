import { IsString, IsNotEmpty, IsOptional, IsObject } from 'class-validator';

export class ConnectAccountDto {
  @IsString()
  @IsNotEmpty()
  provider!: string; // e.g. "github", "linkedin"

  @IsString()
  @IsNotEmpty()
  identifier!: string; // e.g. "thuyencode"

  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;
}
