import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFlowMomentDto {
  @ApiProperty({ example: 'ShadowWork.tsx' })
  @IsString()
  fileName!: string;

  @ApiProperty({ example: 'feature/alchemical-reflection' })
  @IsString()
  gitBranch!: string;

  @ApiProperty({ example: 35 })
  @IsNumber()
  cpuLoad!: number;

  @ApiProperty({ example: 215.4 })
  @IsNumber()
  coordX!: number;

  @ApiProperty({ example: 148.9 })
  @IsNumber()
  coordY!: number;
}
