import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import configuration from './configuration';
import { TypeOrmConfigService } from './configuration.service';
import { validationSchema } from './validation-scheme';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: validationSchema,
    }),
  ],
  providers: [ConfigService, TypeOrmConfigService],
  exports: [ConfigService, TypeOrmConfigService],
})
export class TypeOrmConfigModule {}
