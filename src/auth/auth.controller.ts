import {
  Controller,
  Post,
  UseGuards,
  Request,
  Headers,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/signin')
  async signin(@Request() req) {
    return this.authService.signin(req.user);
  }

  @Post('/signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService
      .signup(createUserDto)
      .then(user => {
        return user.userId;
      })
      .catch(error => {
        throw error;
      });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/signout')
  async signout(@Headers('authorization') auth) {
    const token = auth.split(' ')[1];
    return this.authService.signout(token);
  }
}
