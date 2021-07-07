import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthConfigModule } from '@nwc/api/nest/shared/config/auth';

import { JwtStrategy } from './adapter/in/auth/strategies/jwt.strategy';
import { AuthController } from './adapter/in/web/auth.controller';
import { UserController } from './adapter/in/web/user.controller';
import { UserRepository } from './adapter/out/persistance/database/user.repository';
import { UserPersistenceCommandAdapter } from './adapter/out/persistance/user-persistance-command.adapter';
import { UserPersistenceQueryAdapter } from './adapter/out/persistance/user-persistence-query.adapter';
import { UserPersistenceModule } from './adapter/out/persistance/user-persistence.module';
import { TokenProviderAdapter } from './adapter/out/token/token-provider.adapter';
import { TokenProviderModule } from './adapter/out/token/token-provider.module';
import { LOGIN_USER_USE_CASE } from './application/port/in/command/login-user.use-case';
import { SIGN_UP_USER_USE_CASE } from './application/port/in/command/sign-up-user.use-case';
import { FIND_USER_BY_EMAIL_USE_CASE } from './application/port/in/query/find-user-by-email-use.case';
import { FIND_USER_BY_NAME_USE_CASE } from './application/port/in/query/find-user-by-name-use.case';
import { SAVE_USER_PORT } from './application/port/out/command/save-user.port';
import { EXISTS_BY_EMAIL_PORT } from './application/port/out/query/exists-by-email.port';
import { GET_USER_BY_EMAIL_PORT } from './application/port/out/query/get-user-by-email.port';
import { GET_USER_BY_NAME_PORT } from './application/port/out/query/get-user-by-name.port';
import { TOKEN_PROVIDER_PORT } from './application/port/out/query/token-provider.port';
import { LoginUserService } from './application/service/command/login-user.service';
import { SignUpUserService } from './application/service/command/sign-up-user.service';
import { FindUserByEmailService } from './application/service/query/find-user-by-email.service';
import { FindUserByNameService } from './application/service/query/find-user-by-name.service';

@Module({
  imports: [
    TokenProviderModule,
    UserPersistenceModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthConfigModule,
  ],
  providers: [
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
    {
      provide: SIGN_UP_USER_USE_CASE,
      useClass: SignUpUserService,
    },
    {
      provide: SAVE_USER_PORT,
      useClass: UserPersistenceCommandAdapter,
    },
    {
      provide: LOGIN_USER_USE_CASE,
      useClass: LoginUserService,
    },
    {
      provide: EXISTS_BY_EMAIL_PORT,
      useClass: UserPersistenceQueryAdapter,
    },
    {
      provide: GET_USER_BY_NAME_PORT,
      useClass: UserPersistenceQueryAdapter,
    },
    {
      provide: GET_USER_BY_EMAIL_PORT,
      useClass: UserPersistenceQueryAdapter,
    },
    {
      provide: TOKEN_PROVIDER_PORT,
      useClass: TokenProviderAdapter,
    },
    {
      provide: FIND_USER_BY_NAME_USE_CASE,
      useClass: FindUserByNameService,
    },
    {
      provide: FIND_USER_BY_EMAIL_USE_CASE,
      useClass: FindUserByEmailService,
    },
    {
      provide: FIND_USER_BY_EMAIL_USE_CASE,
      useClass: FindUserByEmailService,
    },
    JwtStrategy,
  ],
  controllers: [AuthController, UserController],
})
export class UserModule {}
