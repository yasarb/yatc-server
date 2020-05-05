import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { getRepository } from 'typeorm';

export type User = any;

@Injectable()
export class UsersService {
  async findByUsername(username: string): Promise<User | undefined> {
    return this.findOne({ username }).then(user => {
      if (user) {
        return user;
      } else {
        throw new NotFoundException();
      }
    });
  }

  async findUserById(userId: number): Promise<User> {
    return this.findOne({ userId }).then(user => {
      if (user) {
        return user;
      } else {
        throw new NotFoundException(`User not found with given id: ${userId}`);
      }
    });
  }

  async save(entity: User): Promise<User> {
    const userRepository = getRepository(User);
    return userRepository.save(entity);
  }

  private async findOne(filter): Promise<User | undefined> {
    const userRepository = getRepository(User);
    return userRepository.findOne(filter);
  }
}
