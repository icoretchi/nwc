import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PassportModule } from '@nestjs/passport';
import {
  CreateUserCommandHandler,
  FindUserByEmailQueryHandler,
  SignUpUserCommandHandler,
} from '@nwc/api/nest/ngshop/user/core/application';
import {
  CREATE_USER_PORT,
  EXISTS_BY_EMAIL_PORT,
  GET_USER_BY_EMAIL_PORT,
  GET_USER_BY_NAME_PORT,
  SAVE_USER_PORT,
  TOKEN_PROVIDER_PORT,
} from '@nwc/api/nest/ngshop/user/core/ports';
import {
  AuthModule,
  JwtStrategy,
} from '@nwc/api/nest/ngshop/user/infrastructure/auth';
import {
  UserMapper,
  UserMongooseModule,
  UserPersistenceCommandAdapter,
  UserPersistenceQueryAdapter,
  UserRepository,
} from '@nwc/api/nest/ngshop/user/infrastructure/orms/mongoose';
import {
  TokenProviderAdapter,
  UserTokenProviderModule,
} from '@nwc/api/nest/ngshop/user/infrastructure/token';
import { AuthConfigModule } from '@nwc/api/nest/shared/config/auth';

const CommandHandlers = [CreateUserCommandHandler, SignUpUserCommandHandler];
const QueryHandlers = [FindUserByEmailQueryHandler];

@Module({
  imports: [
    UserTokenProviderModule,
    UserMongooseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // AuthConfigModule,
    AuthModule,
    CqrsModule,
  ],
  providers: [
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'UserMapper',
      useClass: UserMapper,
    },
    {
      provide: CREATE_USER_PORT,
      useClass: UserPersistenceCommandAdapter,
    },
    {
      provide: SAVE_USER_PORT,
      useClass: UserPersistenceCommandAdapter,
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
    JwtStrategy,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class UserShellModule {}
