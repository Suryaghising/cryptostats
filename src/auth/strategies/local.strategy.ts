import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    console.log('heree === LocalStrategy');
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    console.log(`heree === email: ${email}, password: ${password}`);
    return this.userService.validateUser(email, password);
  }
}
