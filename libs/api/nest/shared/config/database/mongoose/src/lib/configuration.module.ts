import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { mongooseConfig } from './configuration';
import { MongooseConfigService } from './configuration.service';
import { validationSchema } from './validation-scheme';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mongooseConfig],
      validationSchema: validationSchema,
    }),
  ],
  providers: [ConfigService, MongooseConfigService],
  exports: [ConfigService, MongooseConfigService],
})
export class MongooseConfigModule {}
