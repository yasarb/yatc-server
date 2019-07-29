import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly redis: RedisService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (user && user.password === password) {
      // tslint:disable-next-line:no-shadowed-variable
      const { password, ...result } = user;
      return result;
    } else {
      return null;
    }
  }

  async signin(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signout(token: string) {
    const payload = this.jwtService.decode(token);
    const payloadStr = JSON.stringify(payload);

    const expField = 'exp';

    await this.redis
      .getClient()
      .zadd('jwt:revoked:tokens', payload[expField], payloadStr);
  }
}
