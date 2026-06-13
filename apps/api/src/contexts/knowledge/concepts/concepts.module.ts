import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '@root/shared/infrastructure/prisma/prisma.module';
import { AuthModule } from '@root/contexts/iam/auth/auth.module';
import { ConceptsController } from './presentation/controllers';
import { ConceptPresenter } from './presentation/presenters';
import { PrismaConceptRepositoryProvider } from './infrastructure/repositories/prisma-concept.repository';
import { ConceptRepository } from './domain/concept.repository';
import { ConceptsCommandHandlers } from './application/commands';
import { ConceptsQueryHandlers } from './application/queries';

@Module({
  imports: [PrismaModule, AuthModule, CqrsModule],
  controllers: [ConceptsController],
  providers: [
    ConceptPresenter,
    PrismaConceptRepositoryProvider,
    {
      provide: ConceptRepository,
      useExisting: 'ConceptRepository',
    },
    ...ConceptsCommandHandlers,
    ...ConceptsQueryHandlers,
  ],
  exports: ['ConceptRepository', ConceptRepository],
})
export class ConceptsModule {}
