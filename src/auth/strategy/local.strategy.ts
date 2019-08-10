import { Strategy } from 'passport-local';
import { Injectable, BadRequestException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { use } from 'passport';

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
