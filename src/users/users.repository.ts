import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './models/user';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly user: Model<User>,
  ) {}

  async insertOne(data: Partial<User>) {
    const user = new this.user(data);
    return user.save();
  }

  async findOneByEmail(email: string) {
    return this.user.findOne({ email });
  }

  findOneById(userId: string) {
    return this.user.findById({ userId });
  }

  updateOne(userId: string, data: Partial<User>) {
    return this.user.findByIdAndUpdate(userId, data, { new: true });
  }
}
