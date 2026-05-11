import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserController } from './presentation/controllers/user.controller';
import { PrismaUserRepository } from './infrastructure/repositories/prisma-user.repository';
import { UserMapper } from './infrastructure/mappers/user.mapper';
import { SharedModule } from '@shared/shared.module';
import {
  CreateUserHandler,
  UpdateUserHandler,
  DeleteUserHandler,
  GetUsersHandler,
  GetUserByIdHandler,
  InvalidateUserCacheHandler,
  RestoreUserHandler,
  ConnectAccountHandler,
} from './application/handlers';
import { UserRepository } from './application/ports/user.repository';

const CommandHandlers = [
  CreateUserHandler,
  UpdateUserHandler,
  DeleteUserHandler,
  RestoreUserHandler,
  ConnectAccountHandler,
];
const QueryHandlers = [GetUsersHandler, GetUserByIdHandler];
const EventHandlers = [InvalidateUserCacheHandler];

@Module({
  imports: [CqrsModule, SharedModule],
  controllers: [UserController],
  providers: [
    UserMapper,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: 'UserRepository',
      useClass: PrismaUserRepository,
    },
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
  ],
  exports: [UserRepository],
})
export class UserModule {}
