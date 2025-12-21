import { PartialType } from '@nestjs/swagger';
import { CreateJournalDto } from '../presentation/dto/create-journal.dto';

export class UpdateJournalDto extends PartialType(CreateJournalDto) {}
