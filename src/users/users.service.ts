import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserRequest } from './dtos/request/create-user-request.dto';
import { UserRepository } from './users.repository';
import { User } from './models/user';
import { hash, compare } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserRequest: CreateUserRequest) {
    this.validateCreateUserRequest(createUserRequest);
    const user = await this.userRepository.insertOne({
      ...createUserRequest,
      password: await hash(createUserRequest.password, 10),
    });
    return this.buildResponse(user);
  }

  private async validateCreateUserRequest(
    createUserRequest: CreateUserRequest,
  ) {
    const user = await this.userRepository.findOneByEmail(
      createUserRequest.email,
    );
    if (user) {
      throw new BadRequestException('This email already exists');
    }
  }

  async updateUser(userId: string, data: Partial<User>) {
    const user = await this.userRepository.updateOne(userId, data);
    if (!user) {
      throw new NotFoundException('User does not exit');
    }
    return this.buildResponse(user);
  }

  async validateUser(email: string, password: string) {
    console.log(`email: ${email}, password: ${password}`);
    const user = await this.userRepository.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException('User does not exit');
    }

    const passwordIsValid = await compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Password is wrong.');
    }

    return this.buildResponse(user);
  }

  async getUserById(userId: string) {
    console.log(`userid=== ${userId}`);
    const user = await this.userRepository.findOneById(userId);
    if (!user) {
      throw new NotFoundException('User does not exit');
    }

    return this.buildResponse(user);
  }


  async getCoinbaseAuth(userId: string) {
    const user = await this.userRepository.findOneById(userId);
    if (!user) {
      throw new NotFoundException('User does not exit');
    }

    if(!user.coinbaseAuth) {
      throw new UnauthorizedException('User does not have coinbaseAuth');
    }

    return user.coinbaseAuth;
  }

  private buildResponse(user: User) {
    return {
      _id: user._id,
      email: user.email,
      iscCoinbaseAuthorized: !!user.coinbaseAuth,
    };
  }
}
