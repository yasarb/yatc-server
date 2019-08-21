import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RedisService } from '../redis/redis.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserDto } from '../users/dto/user.dto';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly redis: RedisService,
  ) {}

  async validateUser(username: string, password: string): Promise<UserDto> {
    return this.usersService
      .findUserByUsername(username)
      .then(user => {
        const userDto = UserDto.fromEntity(user);

        if (userDto) {
          return bcrypt.compare(password, userDto.password).then(same => {
            if (same) {
              return userDto;
            } else {
              throw new UnauthorizedException(
                'Incorrect username or password.',
              );
            }
          });
        } else {
          throw new UnauthorizedException('Incorrect username or password.');
        }
      })
      .catch(error => {
        throw error;
      });
  }

  signin(user: any): object {
    const payload = { username: user.username, sub: user.userId };
    return {
      userId: user.userId,
      username: user.username,
      accessToken: this.jwtService.sign(payload),
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
        user.lang = createUserDto.lang;
        user.registeredAt = new Date();

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
