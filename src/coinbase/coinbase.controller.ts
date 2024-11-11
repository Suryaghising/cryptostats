import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { Request, Response } from 'express';
import { CoinbaseAuthService } from './coinbase-auth.service';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { UserResponse } from 'src/users/dtos/response/user-response.dto';
import { CoinbaseService } from './coinbase.service';

@Controller('coinbase')
export class CoinbaseController {

  constructor(private readonly coinbaseAuthService: CoinbaseAuthService, private readonly coinbaseService: CoinbaseService) {}

  @Get('auth')
  @UseGuards(JwtGuard)
  authorize(@Res() response: Response) {
    this.coinbaseAuthService.authorize(response);
  }

  @Get('auth/callback')
    @UseGuards(JwtGuard)
    handleCallback(@Req() request: Request, @Res() response: Response) {
        this.coinbaseAuthService.handleCallback(request, response);
    }

    @Get()
    @UseGuards(JwtGuard)
    getCoinbaseData(@CurrentUser() user: UserResponse) {
      return this.coinbaseService.getPrimaryAccountTransactions(user._id);
    }
}
