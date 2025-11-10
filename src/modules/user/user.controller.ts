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
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, QueryUserDto } from './dtos';
import { JwtAuthGuard } from '@modules/auth/guards';
import { PermissionsGuard } from '@shared/guards/permissions.guard';
import { Permissions } from '@shared/decorators';
import { PermissionEnum } from '@shared/enums';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Permissions(PermissionEnum.CREATE_USER)
  @Post('/')
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Permissions(PermissionEnum.READ_USER)
  @Get('/')
  findAll(@Query() query: QueryUserDto) {
    return this.userService.findAll(query);
  }

  @Permissions(PermissionEnum.READ_USER)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Permissions(PermissionEnum.UPDATE_USER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  }

  @Permissions(PermissionEnum.DELETE_USER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
