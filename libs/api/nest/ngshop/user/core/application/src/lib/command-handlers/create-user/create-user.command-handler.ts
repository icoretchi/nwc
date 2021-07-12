import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  EmailAlreadyExistsError,
  UserAggregate,
} from '@nwc/api/nest/ngshop/user/core/domain';
import {
  CREATE_USER_PORT,
  CreateUserCommand,
  CreateUserPort,
  EXISTS_BY_EMAIL_PORT,
  EXISTS_BY_ID_PORT,
  ExistsByEmailPort,
  ExistsByIdPort,
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
  Result<UserAggregate>
>;

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(CREATE_USER_PORT)
    private readonly userCreated: CreateUserPort,
    @Inject(EXISTS_BY_EMAIL_PORT)
    private readonly existsUserByEmail: ExistsByEmailPort,
    @Inject(EXISTS_BY_ID_PORT)
    private readonly existsUserById: ExistsByIdPort
  ) {}

  async execute(command: CreateUserCommand): Promise<Response> {
    const { email, username, password } = command;
    try {
      if (await this.existsUserByEmail.existsByEmail(email)) {
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

      return right(Result.ok<UserAggregate>(createdUser)) as Response;
    } catch (err) {
      return left(new AppError.UnexpectedError(err)) as Response;
    }
  }
}
