import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserDto, UpdateUserDto, QueryUserDto } from '../../dto';
import { JwtAuthGuard } from 'src/contexts/iam/auth/application/guards';
import { PermissionsGuard } from '@shared/guards/permissions.guard';
import { Permissions } from '@shared/decorators';
import { PermissionEnum } from '@shared/enums';
import {
  CreateUserCommand,
  UpdateUserCommand,
  DeleteUserCommand,
  ConnectAccountCommand,
} from '../../application/commands';
import { GetUsersQuery, GetUserByIdQuery } from '../../application/queries';
import { GetUser as User } from 'src/contexts/iam/auth/application/decorators/get-user.decorator';
import { ConnectAccountDto } from '../../application/dtos/connect-account.dto';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('users')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Permissions(PermissionEnum.CREATE_USER)
  @Post('/')
  create(@Body() dto: CreateUserDto) {
    return this.commandBus.execute(new CreateUserCommand(dto));
  }

  @Permissions(PermissionEnum.READ_USER)
  @Get('/')
  findAll(@Query() query: QueryUserDto) {
    return this.queryBus.execute(new GetUsersQuery(query));
  }

  @Permissions(PermissionEnum.READ_USER)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.queryBus.execute(new GetUserByIdQuery(id));
  }

  @Permissions(PermissionEnum.UPDATE_USER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.commandBus.execute(new UpdateUserCommand(id, dto));
  }

  @Permissions(PermissionEnum.DELETE_USER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteUserCommand(id));
  }

  @Post('connect')
  connectAccount(@User() user: any, @Body() dto: ConnectAccountDto) {
    // Requires User Decorator to retrieve logged-in user ID
    // If User decorator provides the full user or just ID, adjust accordingly.
    // Assuming user object has 'id'.
    return this.commandBus.execute(
      new ConnectAccountCommand(
        String(user.id),
        dto.provider,
        dto.identifier,
        dto.metadata,
      ),
    );
  }
}
