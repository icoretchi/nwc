import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { jwtConfig } from './configuration';
import { JwtConfigService, OAuth2ConfigService } from './configuration.service';
import { validationSchema } from './validation-scheme';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [jwtConfig],
      validationSchema: validationSchema,
    }),
  ],
  providers: [ConfigService, OAuth2ConfigService, JwtConfigService],
  exports: [ConfigService, OAuth2ConfigService, JwtConfigService],
})
export class AuthConfigModule {}
