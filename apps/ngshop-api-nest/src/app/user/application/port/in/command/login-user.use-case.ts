import * as E from 'fp-ts/Either';

import { User } from '../../../../domain/model/user.domain-model';
import { LoginUserCommand } from './login-user.command';

export interface LoginUserUseCase {
  login(
    command: LoginUserCommand
  ): Promise<E.Either<LoginUserErrors, { user: User; token: string }>>;
}

export enum LoginUserErrors {
  InvalidCredentials = 'INVALID_CREDENTIALS',
}

export const LOGIN_USER_USE_CASE = Symbol('LOGIN_USER_USE_CASE');
