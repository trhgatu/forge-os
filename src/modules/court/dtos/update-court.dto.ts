// src/modules/court/dtos/update-court.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateCourtDto } from './create-court.dto';

export class UpdateCourtDto extends PartialType(CreateCourtDto) {}
