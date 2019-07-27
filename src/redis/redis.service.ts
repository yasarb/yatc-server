import { Injectable, OnModuleInit } from '@nestjs/common';
import { RedisClient, ClientOpts } from 'redis';
import { createClient as asyncCreateClient } from 'async-redis';

@Injectable()
export class RedisService implements OnModuleInit {
  private client: RedisClient = null;

  private readonly options: ClientOpts = {
    host: 'yasa-redis',
    port: 6379,
  };

  onModuleInit() {
    this.client = asyncCreateClient(this.options);
  }

  getClient() {
    return this.client;
  }
}
