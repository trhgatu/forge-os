import { Module } from '@nestjs/common';
import { ConceptsModule } from './concepts/concepts.module';
import { FlashcardsModule } from './flashcards/flashcards.module';

@Module({
  imports: [ConceptsModule, FlashcardsModule],
  exports: [ConceptsModule, FlashcardsModule],
})
export class KnowledgeModule {}
