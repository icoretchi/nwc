import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  Result,
  UnexpectedError,
  left,
  right,
} from '@nwc/api/nest/nghrms/shared/common';

import { UserAggregate } from '../../../../domain';
import {
  CREATE_USER_PORT,
  CreateUserPort,
  EXISTS_BY_EMAIL_PORT,
  ExistsByEmailPort,
  SignUpUserCommand,
  TOKEN_PROVIDER_PORT,
  TokenProviderPort,
} from '../../../ports';
import { EmailAlreadyExistsError } from '../../errors';
import { SignUpUserResponse } from './sign-up-user.response';

@CommandHandler(SignUpUserCommand)
export class SignUpUserCommandHandler
  implements ICommandHandler<SignUpUserCommand, SignUpUserResponse> {
  constructor(
    @Inject(CREATE_USER_PORT)
    private readonly userCreated: CreateUserPort,
    @Inject(EXISTS_BY_EMAIL_PORT)
    private readonly existsUser: ExistsByEmailPort,
    @Inject(TOKEN_PROVIDER_PORT)
    private readonly tokenProvider: TokenProviderPort
  ) {}

  async execute(command: SignUpUserCommand): Promise<SignUpUserResponse> {
    const { email, password } = command;
    try {
      const userEmailAlreadyExists = await this.existsUser.existsByEmail(email);
      if (userEmailAlreadyExists) {
        return left(EmailAlreadyExistsError.with(email)) as SignUpUserResponse;
      }

      await password.encryptPassword();
      const userOrError: Result<UserAggregate> = UserAggregate.create({
        email,
        password,
      });

      if (userOrError.isFailure) {
        return left(
          Result.fail<UserAggregate>(userOrError.error.toString())
        ) as SignUpUserResponse;
      }

      const user: UserAggregate = userOrError.getValue();

      const createdUser = await this.userCreated.create(user);

      return right(
        Result.ok<{ user: UserAggregate; token: string }>({
          user: createdUser,
          token: this.tokenProvider.signToken(
            createdUser.id.value,
            createdUser.email.value
          ),
        })
      ) as SignUpUserResponse;
    } catch (err) {
      return left(UnexpectedError.with(err)) as SignUpUserResponse;
    }
  }
}
