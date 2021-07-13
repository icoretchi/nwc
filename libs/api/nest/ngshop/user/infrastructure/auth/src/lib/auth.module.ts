import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import {
  AuthConfigModule,
  JwtConfigService,
} from '@nwc/api/nest/shared/config/auth';

import { JwtStrategy } from './strategies';

@Module({
  imports: [
    CqrsModule,
    AuthConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [AuthConfigModule],
      useClass: JwtConfigService,
    }),
  ],
  providers: [JwtStrategy],
  exports: [JwtStrategy],
})
export class AuthModule {}
