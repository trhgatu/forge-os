import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MoodType } from '@shared/enums';
import { JournalStatus, JournalType, JournalRelationType, JournalSource } from '../../domain/enums';

export class JournalRelationResponse {
  @ApiProperty({ enum: JournalRelationType })
  type!: JournalRelationType;

  @ApiProperty()
  id!: string;
}

export class JournalResponse {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  content!: string;

  @ApiPropertyOptional({ enum: MoodType })
  mood?: MoodType;

  @ApiProperty({ type: [String] })
  tags!: string[];

  @ApiProperty({ enum: JournalType })
  type!: JournalType;

  @ApiProperty({ enum: JournalStatus })
  status!: JournalStatus;

  @ApiProperty({ enum: JournalSource })
  source!: JournalSource;

  @ApiProperty({ type: [JournalRelationResponse] })
  relations!: JournalRelationResponse[];

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;

  @ApiProperty()
  isDeleted!: boolean;

  @ApiPropertyOptional({ type: Object })
  analysis?: any;

  @ApiPropertyOptional({ type: String, nullable: true })
  deletedAt!: string | null;
}
