import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from './current-user.decorator';
import { UserResponse } from 'src/users/dtos/response/user-response.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
    console.log('heree === AuthController');
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: UserResponse,
    @Res({ passthrough: true }) response: Response,
  ) {
    console.log('Login endpoint hit with user:', user);
    try {
      await this.authService.login(user, response);
      response.send(user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }
}
