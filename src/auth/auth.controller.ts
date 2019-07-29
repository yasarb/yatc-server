import { Controller, Post, UseGuards, Request, Headers } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/signin')
  async signin(@Request() req) {
    return this.authService.signin(req.user);
  }

  @Post('/signup')
  signup() {
    // todo
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/signout')
  async signout(@Headers('authorization') auth) {
    const token = auth.split(' ')[1];
    return this.authService.signout(token);
  }
}
