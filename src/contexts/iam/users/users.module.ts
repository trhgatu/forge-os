import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { User, UserSchema } from './infrastructure/schemas/iam-user.schema';
import { UserController } from './presentation/controllers/user.controller';
import { SharedModule } from '@shared/shared.module';
import { UserRepository } from './application/ports/user.repository';
import { MongoUserRepository } from './infrastructure/repositories/mongo-user.repository';
import {
  CreateUserHandler,
  UpdateUserHandler,
  DeleteUserHandler,
  GetUsersHandler,
  GetUserByIdHandler,
  InvalidateUserCacheHandler,
  RestoreUserHandler,
} from './application/handlers';

const CommandHandlers = [
  CreateUserHandler,
  UpdateUserHandler,
  DeleteUserHandler,
  RestoreUserHandler,
];
const QueryHandlers = [GetUsersHandler, GetUserByIdHandler];
const EventHandlers = [InvalidateUserCacheHandler];

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CqrsModule,
    SharedModule,
  ],
  controllers: [UserController],
  providers: [
    {
      provide: UserRepository,
      useClass: MongoUserRepository,
    },
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
  ],
  exports: [UserRepository],
})
export class UserModule {}
