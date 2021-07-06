import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import {
  AuthConfigModule,
  JwtConfigService,
} from '@nwc/api/nest/shared/config/auth';

import { TokenProviderAdapter } from './token-provider.adapter';

@Module({
  imports: [
    AuthConfigModule,
    JwtModule.registerAsync({
      imports: [AuthConfigModule],
      useClass: JwtConfigService,
    }),
  ],
  providers: [TokenProviderAdapter],
  exports: [TokenProviderAdapter, JwtModule],
})
export class TokenProviderModule {}
