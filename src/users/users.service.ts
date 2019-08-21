import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';

export type User = any;

@Injectable()
export class UsersService {
  async findUserByUsername(username: string): Promise<User | undefined> {
    return User.findOne({ username }).then(user => {
      if (user) {
        return user;
      } else {
        return undefined;
      }
    });
  }

  async findUserById(userId: number): Promise<User> {
    return User.findOne({ userId }).then(user => {
      if (user) {
        return user;
      } else {
        throw new NotFoundException(`User not found with given id: ${userId}`);
      }
    });
  }
}
