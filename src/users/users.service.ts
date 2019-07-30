import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

export type User = any;

@Injectable()
export class UsersService {
  async findOne(username: string): Promise<User | undefined> {
    return User.findOne({ username });
  }
}
