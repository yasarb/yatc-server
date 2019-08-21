import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';

export type User = any;

@Injectable()
export class UsersService {
  async findUserByUsername(username: string): Promise<UserDto | undefined> {
    return User.findOne({ username }).then(user => {
      if (user) {
        return UserDto.fromEntity(user);
      } else {
        return undefined;
      }
    });
  }

  async findUserById(userId: number): Promise<UserDto> {
    return User.findOne({ userId }).then(user => {
      if (user) {
        return UserDto.fromEntity(user);
      } else {
        throw new NotFoundException(`User not found with given id: ${userId}`);
      }
    });
  }
}
