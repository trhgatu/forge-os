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
import { Permissions } from '@shared/decorators';
import { PermissionEnum } from '@shared/enums';
import { PermissionsGuard } from '@shared/guards/permissions.guard';
import { CreateRoleDto, UpdateRoleDto, QueryRoleDto } from '../../dto';
import { JwtAuthGuard } from 'src/contexts/iam/auth/application/guards';
import {
  CreateRoleCommand,
  UpdateRoleCommand,
  DeleteRoleCommand,
} from '../../application/commands';
import { GetRolesQuery, GetRoleByIdQuery } from '../../application/queries';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('roles')
export class RoleController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Permissions(PermissionEnum.CREATE_ROLE)
  @Post('/create')
  create(@Body() dto: CreateRoleDto) {
    return this.commandBus.execute(new CreateRoleCommand(dto));
  }

  @Permissions(PermissionEnum.READ_ROLE)
  @Get('/')
  findAll(@Query() query: QueryRoleDto) {
    return this.queryBus.execute(new GetRolesQuery(query));
  }

  @Permissions(PermissionEnum.READ_ROLE)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.queryBus.execute(new GetRoleByIdQuery(id));
  }

  @Permissions(PermissionEnum.UPDATE_ROLE)
  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() dto: UpdateRoleDto) {
    return this.commandBus.execute(new UpdateRoleCommand(id, dto));
  }

  @Permissions(PermissionEnum.DELETE_ROLE)
  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteRoleCommand(id));
  }
}
