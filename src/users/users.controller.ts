import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Public } from 'src/auth/decorators/public.decorator';
import { Permissions } from 'src/auth/decorators/permissions.decorator';
import { Permission } from 'src/auth/permissions.enum';
import { AuthService } from 'src/auth/auth.service';
import { User as CurrentUser } from './../auth/decorators/user.decorator';
import { Policy } from 'src/auth/policy.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private authService: AuthService) {}

  @Post()
  @Permissions(Permission.USER_CREATE)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  @Public()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @Permissions(Permission.USER_READ)
  async findOne(@Param('id') id: string, @CurrentUser() user): Promise<User> {
    const resource = await this.usersService.findOne(id);

    this.authService.authorize(user, resource, Policy.RESOURCE_ID_MATCH);

    return resource;
  }

  @Patch(':id')
  @Permissions(Permission.USER_UPDATE)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Permissions(Permission.USER_DELETE)
  async remove(@Param('id') id: string): Promise<User> {
    return await this.usersService.remove(id);
  }
}
