import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators/core';
import * as E from 'fp-ts/Either';

import { User } from '../../../domain/model/user.domain-model';
import { SignUpUserCommand } from '../../port/in/command/sign-up-user.command';
import {
  SignUpUserErrors,
  SignUpUserUseCase,
} from '../../port/in/command/sign-up-user.use-case';
import {
  SAVE_USER_PORT,
  SaveUserPort,
} from '../../port/out/command/save-user.port';
import {
  EXISTS_BY_EMAIL_PORT,
  ExistsByEmailPort,
} from '../../port/out/query/exists-by-email.port';
import {
  TOKEN_PROVIDER_PORT,
  TokenProviderPort,
} from '../../port/out/query/token-provider.port';

@Injectable()
export class SignUpUserService implements SignUpUserUseCase {
  constructor(
    @Inject(SAVE_USER_PORT)
    private readonly userSaver: SaveUserPort,
    @Inject(EXISTS_BY_EMAIL_PORT)
    private readonly existsUser: ExistsByEmailPort,
    @Inject(TOKEN_PROVIDER_PORT)
    private readonly tokenProvider: TokenProviderPort
  ) {}

  public async signUp(
    command: SignUpUserCommand
  ): Promise<E.Either<SignUpUserErrors, { user: User; token: string }>> {
    if (await this.existsUser.existsByEmail(command.email)) {
      return E.left(SignUpUserErrors.EmailTaken);
    }
    const user = new User(null, command.name, command.email, command.password);

    const savedUser = await this.userSaver.save(await user.hashPassword());

    return E.right({
      user: savedUser,
      token: this.tokenProvider.signToken(savedUser.id, savedUser.email),
    });
  }
}
