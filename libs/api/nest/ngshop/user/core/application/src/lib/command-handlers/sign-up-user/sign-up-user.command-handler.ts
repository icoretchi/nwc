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
  AppError,
  Either,
  Result,
  left,
  right,
} from '@nwc/api/nest/shared/common';

type Response = Either<
  EmailAlreadyExistsError | AppError.UnexpectedError | Result<any>,
  Result<{ user: UserAggregate; token: string }>
>;

@CommandHandler(SignUpUserCommand)
export class SignUpUserCommandHandler
  implements ICommandHandler<SignUpUserCommand> {
  constructor(
    @Inject(CREATE_USER_PORT)
    private readonly userCreated: CreateUserPort,
    @Inject(EXISTS_BY_EMAIL_PORT)
    private readonly existsUser: ExistsByEmailPort,
    @Inject(TOKEN_PROVIDER_PORT)
    private readonly tokenProvider: TokenProviderPort
  ) {}

  async execute(command: SignUpUserCommand): Promise<Response> {
    const { email, username, password } = command;
    try {
      if (await this.existsUser.existsByEmail(email)) {
        return left(EmailAlreadyExistsError.with(email)) as Response;
      }

      const userOrError: Result<UserAggregate> = UserAggregate.create({
        email,
        name: username,
        password,
      });

      if (userOrError.isFailure) {
        return left(
          Result.fail<UserAggregate>(userOrError.error.toString())
        ) as Response;
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
      ) as Response;
    } catch (err) {
      return left(new AppError.UnexpectedError(err)) as Response;
    }
  }
}
