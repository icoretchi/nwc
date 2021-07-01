import { Either, Result, left, right } from '@nwc/api/nest/shared/common';
import { AppError } from '@nwc/api/nest/shared/common';
import { UseCase } from '@nwc/api/nest/shared/common';
import { UserEmail } from '@nwc/api/nest/shared/user/core/domain';
import { UserPassword } from '@nwc/api/nest/shared/user/core/domain';
import { UserName } from '@nwc/api/nest/shared/user/core/domain';
import { User } from '@nwc/api/nest/shared/user/core/domain';
import { UserRepository } from '@nwc/api/nest/shared/user/core/domain-services';

import { CreateUserErrors } from './create-user-errors';
import { CreateUserCommand } from './create-user.command';

type Response = Either<
  | CreateUserErrors.EmailAlreadyExistsError
  | CreateUserErrors.UsernameTakenError
  | AppError.UnexpectedError
  | Result<any>,
  Result<void>
>;

export class CreateUserService
  implements UseCase<CreateUserCommand, Promise<Response>> {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(command: CreateUserCommand): Promise<Response> {
    const emailOrError = UserEmail.create(command.email);
    const passwordOrError = UserPassword.create({ value: command.password });
    const usernameOrError = UserName.create({ name: command.username });

    const dtoResult = Result.combine([
      emailOrError,
      passwordOrError,
      usernameOrError,
    ]);

    if (dtoResult.isFailure) {
      return left(Result.fail<void>(dtoResult.error)) as Response;
    }

    const email: UserEmail = emailOrError.getValue();
    const password: UserPassword = passwordOrError.getValue();
    const username: UserName = usernameOrError.getValue();

    try {
      const userAlreadyExists = await this.userRepo.exists(email);

      if (userAlreadyExists) {
        return left(
          new CreateUserErrors.EmailAlreadyExistsError(email.value)
        ) as Response;
      }

      try {
        const alreadyCreatedUserByUserName = await this.userRepo.getUserByUserName(
          username
        );

        const userNameTaken = !!alreadyCreatedUserByUserName === true;

        if (userNameTaken) {
          return left(
            new CreateUserErrors.UsernameTakenError(username.value)
          ) as Response;
        }
        // eslint-disable-next-line no-empty
      } catch (err) {}

      const userOrError: Result<User> = User.create({
        email,
        password,
        username,
      });

      if (userOrError.isFailure) {
        return left(
          Result.fail<User>(userOrError.error.toString())
        ) as Response;
      }

      const user: User = userOrError.getValue();

      await this.userRepo.save(user);

      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err)) as Response;
    }
  }
}
