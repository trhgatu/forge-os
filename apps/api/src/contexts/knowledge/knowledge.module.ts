import { Module } from '@nestjs/common';
import { PrismaModule } from '@root/shared/infrastructure/prisma/prisma.module';
import { AuthModule } from '@root/contexts/iam/auth/auth.module';
import { KnowledgeService } from './application/services/knowledge.service';
import { FlashcardsService } from './application/services/flashcards.service';
import { KnowledgeController } from './presentation/controllers/knowledge.controller';
import { FlashcardsController } from './presentation/controllers/flashcards.controller';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [KnowledgeController, FlashcardsController],
  providers: [KnowledgeService, FlashcardsService],
  exports: [KnowledgeService, FlashcardsService],
})
export class KnowledgeModule {}
