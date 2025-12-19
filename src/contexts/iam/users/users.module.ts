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
} from './application/commands/handlers';
import {
  GetUsersHandler,
  GetUserByIdHandler,
} from './application/queries/handlers';

const CommandHandlers = [
  CreateUserHandler,
  UpdateUserHandler,
  DeleteUserHandler,
];
const QueryHandlers = [GetUsersHandler, GetUserByIdHandler];

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
  ],
  exports: [UserRepository],
})
export class UserModule {}
