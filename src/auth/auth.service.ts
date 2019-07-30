import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { RedisService } from '../redis/redis.service';
import { User } from '../users/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { QueryFailedError } from 'typeorm/error/QueryFailedError';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly redis: RedisService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<User | undefined> {
    return this.usersService
      .findOne(username)
      .then(user => {
        return bcrypt.compare(password, user.password).then(same => {
          return same ? user : undefined;
        });
      })
      .catch(error => {
        /* tslint:disable-next-line */
        console.error(error);
        return undefined;
      });
  }

  signin(user: any): object {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(createUserDto: CreateUserDto): Promise<User | undefined> {
    const saltRounds = process.env.NODE_ENV === 'development' ? 1 : 10;

    return bcrypt
      .hash(createUserDto.password, saltRounds)
      .then(hash => {
        const user = new User();
        user.username = createUserDto.username;
        user.email = createUserDto.email;
        user.password = hash;
        user.photoId = -1;
        user.lang = createUserDto.lang;
        user.registeredAt = new Date();
        user.isActive = true;

        return user.save();
      })
      .catch(error => {
        throw new BadRequestException();
      });
  }

  async signout(token: string): Promise<void> {
    const payload = this.jwtService.decode(token);
    const payloadStr = JSON.stringify(payload);

    const expField = 'exp';

    await this.redis
      .getClient()
      .zadd('jwt:revoked:tokens', payload[expField], payloadStr);
  }
}
