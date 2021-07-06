import * as E from 'fp-ts/Either';

import { User } from '../../../../domain/model/user.domain-model';
import { SignUpUserCommand } from './sign-up-user.command';

export interface SignUpUserUseCase {
  signUp(
    command: SignUpUserCommand
  ): Promise<E.Either<SignUpUserErrors, { user: User; token: string }>>;
}

export enum SignUpUserErrors {
  UsernameOrEmailTaken = 'UsernameOrEmailTaken',
}

export const SIGN_UP_USER_USE_CASE = Symbol('SIGN_UP_USER_USE_CASE');
