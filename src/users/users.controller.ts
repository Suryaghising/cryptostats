import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserRequest } from './dtos/request/create-user-request.dto';
import { UsersService } from './users.service';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { UserResponse } from './dtos/response/user-response.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() createUserRequest: CreateUserRequest) {
    console.log('createUserRequest', createUserRequest);
    return this.userService.createUser(createUserRequest);
  }

  @Get()
  @UseGuards(JwtGuard)
  async getUser(@CurrentUser() user: UserResponse) {
    return user;
  }
}
