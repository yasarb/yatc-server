import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { RedisService } from './redis/redis.service';
import { User } from './users/user.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly redis: RedisService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/ping')
  ping(): string {
    return 'pong';
  }

  @Post('/user')
  newUser(): any {
    const user = new User();
    user.username = 'yasar1';
    user.password = 'pwd';
    user.email = 'asd@bcd.com';
    user.photoId = 2;
    user.lang = 'tr';

    user.save();
  }
}
