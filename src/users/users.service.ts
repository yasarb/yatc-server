import { Injectable, NotFoundException } from '@nestjs/common';
import { ViewUserDto } from './dto/view-user.dto';
import { User } from './user.entity';

export type User = any;

@Injectable()
export class UsersService {
  async findUserByUsername(username: string): Promise<ViewUserDto | undefined> {
    return User.findOne({ username }).then(user => {
      if (user) {
        return ViewUserDto.fromEntity(user);
      } else {
        return undefined;
      }
    });
  }

  async findUserById(userId: number): Promise<ViewUserDto> {
    return User.findOne({ userId }).then(user => {
      if (user) {
        return ViewUserDto.fromEntity(user);
      } else {
        throw new NotFoundException(`User not found with given id: ${userId}`);
      }
    });
  }
}
