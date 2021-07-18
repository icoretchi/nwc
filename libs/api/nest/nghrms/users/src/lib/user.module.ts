import { Module, OnModuleInit } from '@nestjs/common';
import { CommandBus, CqrsModule, QueryBus } from '@nestjs/cqrs';
import { PassportModule } from '@nestjs/passport';
import { AuthConfigModule } from '@nwc/api/nest/shared/config/auth';

import {
  AuthController,
  JwtStrategy,
  TokenProviderAdapter,
  TokenProviderModule,
  UserMapper,
  UserMongooseModule,
  UserPersistenceCommandAdapter,
  UserPersistenceQueryAdapter,
  UserRepository,
} from './adapters';
import {
  CreateUserCommandHandler,
  FindUserByEmailQueryHandler,
  SignUpUserCommandHandler,
} from './application';
import {
  CREATE_USER_PORT,
  EXISTS_BY_EMAIL_PORT,
  GET_USER_BY_EMAIL_PORT,
  SAVE_USER_PORT,
  TOKEN_PROVIDER_PORT,
} from './application';

const commandHandlers = [CreateUserCommandHandler, SignUpUserCommandHandler];
const queryHandlers = [FindUserByEmailQueryHandler];
const providers = [
  { provide: CommandBus, useClass: CommandBus },
  { provide: QueryBus, useClass: QueryBus },
];
@Module({
  imports: [
    TokenProviderModule,
    UserMongooseModule,
    CqrsModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthConfigModule,
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
      provide: GET_USER_BY_EMAIL_PORT,
      useClass: UserPersistenceQueryAdapter,
    },
    {
      provide: TOKEN_PROVIDER_PORT,
      useClass: TokenProviderAdapter,
    },
    JwtStrategy,
    ...commandHandlers,
    ...queryHandlers,
    ...providers,
  ],
  controllers: [AuthController],
  exports: [...commandHandlers, ...queryHandlers, ...providers],
})
export class UserModule implements OnModuleInit {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}

  onModuleInit(): any {
    this.commandBus.register(commandHandlers);
    this.queryBus.register(queryHandlers);
  }
}
