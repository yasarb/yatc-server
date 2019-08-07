import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { EnvService } from './env.service';

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly envService: EnvService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.envService.get('DB_TYPE'),
      host: this.envService.get('DB_HOST'),
      port: this.envService.get('DB_PORT'),
      username: this.envService.get('DB_USER'),
      password: this.envService.get('DB_PASS'),
      database: this.envService.get('DB_NAME'),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
      keepConnectionAlive: true,
      retryAttempts: 2,
      retryDelay: 1000,
    } as TypeOrmModuleOptions;
  }
}
