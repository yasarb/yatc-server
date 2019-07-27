import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/signin')
  async signin(@Req() req) {
    return this.authService.signin(req.user);
  }

  @Post('/signup')
  signup() {
    // todo
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/signout')
  signout() {
    // todo
  }
}
