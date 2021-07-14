import { Module, OnModuleInit } from '@nestjs/common';
import { CommandBus, CqrsModule, QueryBus } from '@nestjs/cqrs';
import {
  CreateUserCommandHandler,
  FindUserByEmailQueryHandler,
  SignUpUserCommandHandler,
  UserApplicationModule,
} from '@nwc/api/nest/ngshop/user/core/application';
import {
  CREATE_USER_PORT,
  EXISTS_BY_EMAIL_PORT,
  GET_USER_BY_EMAIL_PORT,
  GET_USER_BY_NAME_PORT,
  SAVE_USER_PORT,
  TOKEN_PROVIDER_PORT,
} from '@nwc/api/nest/ngshop/user/core/ports';
import { AuthModule } from '@nwc/api/nest/ngshop/user/infrastructure/auth';
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

const commandHandlers = [CreateUserCommandHandler, SignUpUserCommandHandler];
const queryHandlers = [FindUserByEmailQueryHandler];
const providers = [
  { provide: CommandBus, useClass: CommandBus },
  { provide: QueryBus, useClass: QueryBus },
];
@Module({
  imports: [
    UserApplicationModule,
    UserTokenProviderModule,
    UserMongooseModule,
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
    ...commandHandlers,
    ...queryHandlers,
    ...providers,
  ],
  exports: [...commandHandlers, ...queryHandlers, ...providers],
})
export class UserShellModule implements OnModuleInit {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}

  onModuleInit(): any {
    this.commandBus.register(commandHandlers);
    this.queryBus.register(queryHandlers);
  }
}
