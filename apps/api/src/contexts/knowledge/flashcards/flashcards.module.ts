import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '@root/shared/infrastructure/prisma/prisma.module';
import { AuthModule } from '@root/contexts/iam/auth/auth.module';
import { FlashcardsController } from './presentation/controllers';
import { FlashcardPresenter } from './presentation/presenters';
import { PrismaFlashcardRepositoryProvider } from './infrastructure/repositories/prisma-flashcard.repository';
import { FlashcardRepository } from './domain/flashcard.repository';
import { FlashcardCommandHandlers } from './application/commands';
import { FlashcardQueryHandlers } from './application/queries';

@Module({
  imports: [PrismaModule, AuthModule, CqrsModule],
  controllers: [FlashcardsController],
  providers: [
    FlashcardPresenter,
    PrismaFlashcardRepositoryProvider,
    {
      provide: FlashcardRepository,
      useExisting: 'FlashcardRepository',
    },
    ...FlashcardCommandHandlers,
    ...FlashcardQueryHandlers,
  ],
  exports: ['FlashcardRepository', FlashcardRepository],
})
export class FlashcardsModule {}
