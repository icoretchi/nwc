import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import configuration from './configuration';
import { SequelizeConfigService } from './configuration.service';
import { validationSchema } from './validation-scheme';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: validationSchema,
    }),
  ],
  providers: [ConfigService, SequelizeConfigService],
  exports: [ConfigService, SequelizeConfigService],
})
export class SequelizeConfigModule {}
