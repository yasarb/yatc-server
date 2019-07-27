import { Controller, Get, Post, Req, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { RedisService } from './redis/redis.service';

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

  @Post('write')
  write(@Body() body) {
    this.redis.getClient().incrby('testkey', 1);
    return 'hello';
  }

  @Get('read')
  read() {
    const value = this.redis.getClient().get('testkey');
    return value;
  }
}
