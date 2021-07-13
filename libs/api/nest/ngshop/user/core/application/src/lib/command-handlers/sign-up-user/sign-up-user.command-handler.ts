import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  EmailAlreadyExistsError,
  UserAggregate,
} from '@nwc/api/nest/ngshop/user/core/domain';
import {
  CREATE_USER_PORT,
  CreateUserPort,
  EXISTS_BY_EMAIL_PORT,
  ExistsByEmailPort,
  SignUpUserCommand,
  TOKEN_PROVIDER_PORT,
  TokenProviderPort,
} from '@nwc/api/nest/ngshop/user/core/ports';
import {
  Result,
  UnexpectedError,
  left,
  right,
} from '@nwc/api/nest/shared/common';

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
    const { email, username, password } = command;
    try {
      const userEmailAlreadyExists = await this.existsUser.existsByEmail(email);

      if (userEmailAlreadyExists) {
        return left(EmailAlreadyExistsError.with(email)) as SignUpUserResponse;
      }

      const userOrError: Result<UserAggregate> = UserAggregate.create({
        email,
        name: username,
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
            createdUser.id.toString(),
            createdUser.email.value
          ),
        })
      ) as SignUpUserResponse;
    } catch (err) {
      return left(UnexpectedError.with(err)) as SignUpUserResponse;
    }
  }
}
