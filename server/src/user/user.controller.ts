import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,) {}
  // private readonly authService: AuthService
  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.userService.create(createUserDto);
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  @Get('get-all')
  async findAll() {
    try {
      const users = await this.userService.findAll();
      return users;
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findOne(@Query('id') id: string) {
    try {
      const user = await this.userService.findOne(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  @Get(':email')
  async findByEmail(@Param('email') email: string) {
    try {
      const user = await this.userService.findByEmail(email);
      return user;
    } catch (error) {
      throw error;
    }
  }

  @Put('update')
  async update(@Query('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.userService.update(id, updateUserDto);
      return updatedUser;
    } catch (error) {
      throw  error;
    }
  }

  @Delete(':id')
  async remove(@Query('id') id: string) {
    try {
      const deletedUser = await this.userService.remove(id);
      return  deletedUser;
    } catch ( error) {
      throw error;
    }
  }
}
