import { Module } from '@nestjs/common';
import { EnvService } from './env.service';
import { PostgresConfigService } from './postgres.service';

@Module({
  providers: [
    {
      provide: EnvService,
      useValue: new EnvService(
        `${__dirname}/../../${process.env.NODE_ENV}.env`,
      ),
    },
    PostgresConfigService,
  ],
  exports: [PostgresConfigService, EnvService],
})
export class ConfigModule {}
