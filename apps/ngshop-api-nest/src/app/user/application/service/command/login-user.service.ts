import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators/core';
import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';

import { User } from '../../../domain/model/user.domain-model';
import { LoginUserCommand } from '../../port/in/command/login-user.command';
import {
  LoginUserErrors,
  LoginUserUseCase,
} from '../../port/in/command/login-user.use-case';
import {
  GET_USER_BY_EMAIL_PORT,
  GetUserByEmailPort,
} from '../../port/out/query/get-user-by-email.port';
import {
  TOKEN_PROVIDER_PORT,
  TokenProviderPort,
} from '../../port/out/query/token-provider.port';

@Injectable()
export class LoginUserService implements LoginUserUseCase {
  constructor(
    @Inject(GET_USER_BY_EMAIL_PORT)
    private readonly getUserByEmailPort: GetUserByEmailPort,
    @Inject(TOKEN_PROVIDER_PORT)
    private readonly tokenProvider: TokenProviderPort
  ) {}

  public async login(
    command: LoginUserCommand
  ): Promise<E.Either<LoginUserErrors, { user: User; token: string }>> {
    const user = await this.getUserByEmailPort.getByEmail(command.email);

    if (O.isNone(user)) {
      return E.left(LoginUserErrors.InvalidCredentials);
    }

    const presentUser = user.value;
    if (!(await presentUser.canLogin(command.password))) {
      return E.left(LoginUserErrors.InvalidCredentials);
    }

    return E.right({
      user: presentUser,
      token: this.tokenProvider.signToken(presentUser.id, presentUser.email),
    });
  }
}
