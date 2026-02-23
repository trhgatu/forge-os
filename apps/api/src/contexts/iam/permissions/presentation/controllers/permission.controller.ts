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
import { CreatePermissionDto, UpdatePermissionDto } from '../../dto';
import { QueryPermissionDto } from '../../dto/query-permission.dto';
import { JwtAuthGuard } from 'src/contexts/iam/auth/application/guards';
import { PermissionsGuard } from '@shared/guards/permissions.guard';
import { Permissions } from '@shared/decorators';
import { PermissionEnum } from '@shared/enums';
import {
  CreatePermissionCommand,
  UpdatePermissionCommand,
  DeletePermissionCommand,
} from '../../application/commands';
import { GetPermissionsQuery, GetPermissionByIdQuery } from '../../application/queries';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('permissions')
export class PermissionController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Permissions(PermissionEnum.CREATE_PERMISSION)
  @Post()
  create(@Body() dto: CreatePermissionDto) {
    return this.commandBus.execute(new CreatePermissionCommand(dto));
  }

  @Permissions(PermissionEnum.READ_PERMISSION)
  @Get()
  findAll(@Query() query: QueryPermissionDto) {
    return this.queryBus.execute(new GetPermissionsQuery(query));
  }

  @Permissions(PermissionEnum.READ_PERMISSION)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.queryBus.execute(new GetPermissionByIdQuery(id));
  }

  @Permissions(PermissionEnum.UPDATE_PERMISSION)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePermissionDto) {
    return this.commandBus.execute(new UpdatePermissionCommand(id, dto));
  }

  @Permissions(PermissionEnum.DELETE_PERMISSION)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandBus.execute(new DeletePermissionCommand(id));
  }
}
