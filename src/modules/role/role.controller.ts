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
import { RoleService } from './role.service';
import { Permissions } from '@shared/decorators';
import { PermissionEnum } from '@shared/enums';
import { PermissionsGuard } from '@shared/guards/permissions.guard';
import { CreateRoleDto, UpdateRoleDto, QueryRoleDto } from './dtos';
import { JwtAuthGuard } from '@modules/auth/guards';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Permissions(PermissionEnum.CREATE_ROLE)
  @Post('/create')
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.create(dto);
  }

  @Permissions(PermissionEnum.READ_ROLE)
  @Get('/')
  findAll(@Query() query: QueryRoleDto) {
    return this.roleService.findAll(query);
  }

  @Permissions(PermissionEnum.READ_ROLE)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.roleService.findById(id);
  }

  @Permissions(PermissionEnum.UPDATE_ROLE)
  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() dto: UpdateRoleDto) {
    return this.roleService.update(id, dto);
  }

  @Permissions(PermissionEnum.DELETE_ROLE)
  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(id);
  }
}
