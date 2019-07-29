import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { jwtConstants } from '../constants';
import { RedisService } from '../../redis/redis.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly redis: RedisService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    const jsonPayload = JSON.stringify(payload);

    return this.isRevoked(jsonPayload).then(revoked => {
      if (revoked) {
        throw new UnauthorizedException();
      }

      return { userId: payload.sub, username: payload.username };
    });
  }

  async isRevoked(jsonPayload: string) {
    const now = Math.floor(Date.now() / 1000);

    const score = await this.redis
      .getClient()
      .zscore('jwt:revoked:tokens', jsonPayload);

    if (score === null) {
      return false;
    } else {
      return parseInt(score.toString(), 10) > now;
    }
  }
}
