import { Module } from '@nestjs/common';
import { CoinbaseController } from './coinbase.controller';
import { CoinbaseAuthService } from './coinbase-auth.service';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { CoinbaseService } from './coinbase.service';

@Module({
  imports: [HttpModule, UsersModule, AuthModule],
  controllers: [CoinbaseController],
  providers: [CoinbaseAuthService, CoinbaseService],
  exports: [HttpModule]
})
export class CoinbaseModule {}
