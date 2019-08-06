import { Strategy } from 'passport-local';
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { use } from 'passport';

/*
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    console.log(`username: ${username}`);
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      console.log(`username: ${username}`);
      throw new UnauthorizedException();
    }

    return user;
  }
}
*/

@Injectable()
export class LocalStrategy {
  constructor(private readonly authService: AuthService) {
    this.init();
  }

  private init(): void {
    use(
      'local-signin',
      new Strategy(
        {
          usernameField: 'username',
          passwordField: 'password',
        },
        async (username: string, password: string, done) => {
          if (!username || !password) {
            done(new BadRequestException(), null);
          }

          this.authService
            .validateUser(username, password)
            .then(user => {
              done(null, user);
            })
            .catch(error => {
              done(error, null);
            });
        },
      ),
    );
  }
}
