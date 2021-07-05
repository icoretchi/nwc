import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import configuration from './configuration';
import { MongooseConfigService } from './configuration.service';
import { validationSchema } from './validation-scheme';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: validationSchema,
    }),
  ],
  providers: [ConfigService, MongooseConfigService],
  exports: [ConfigService, MongooseConfigService],
})
export class MongooseConfigModule {}
