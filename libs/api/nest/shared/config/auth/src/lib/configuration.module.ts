import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import configuration from './configuration';
import { JwtConfigService, OAuth2ConfigService } from './configuration.service';
import { validationSchema } from './validation-scheme';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: validationSchema,
    }),
  ],
  providers: [ConfigService, OAuth2ConfigService, JwtConfigService],
  exports: [ConfigService, OAuth2ConfigService, JwtConfigService],
})
export class OAuth2ConfigModule {}
