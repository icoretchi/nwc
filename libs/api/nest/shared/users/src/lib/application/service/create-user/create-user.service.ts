import { AppError } from '@nwc/api/nest/shared/core';
import { Either, Result, left, right } from '@nwc/api/nest/shared/core';
import { UseCase } from '@nwc/api/nest/shared/core';

import { UserEntity } from '../../../domain/entities/user.entity';
import { UserEmail } from '../../../domain/value-objects/user-email.value-object';
import { UserName } from '../../../domain/value-objects/user-name.value-object';
import { UserPassword } from '../../../domain/value-objects/user-password.value-object';
import { CreateUserCommand } from '../../port/in/create-user.command';
import { UserRepositoryInterface } from '../../port/out/user.repository.interface';
import { CreateUserErrors } from './create-user-errors';

type Response = Either<
  | CreateUserErrors.EmailAlreadyExistsError
  | CreateUserErrors.UsernameTakenError
  | AppError.UnexpectedError
  | Result<any>,
  Result<void>
>;

export class CreateUserService
  implements UseCase<CreateUserCommand, Promise<Response>> {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(command: CreateUserCommand): Promise<Response> {
    const email: UserEmail = command.email;
    const password: UserPassword = command.password;
    const username: UserName = command.username;

    try {
      const userAlreadyExists = await this.userRepository.exists(email);

      if (userAlreadyExists) {
        return left(
          new CreateUserErrors.EmailAlreadyExistsError(email.value)
        ) as Response;
      }

      try {
        const alreadyCreatedUserByUserName = await this.userRepository.getUserByUserName(
          username
        );

        const userNameTaken = !!alreadyCreatedUserByUserName === true;

        if (userNameTaken) {
          return left(
            new CreateUserErrors.UsernameTakenError(username.value)
          ) as Response;
        }
      } catch (err) {
        console.log(err);
      }

      const userOrError: Result<UserEntity> = UserEntity.create({
        email,
        password,
        username,
      });

      if (userOrError.isFailure) {
        return left(
          Result.fail<UserEntity>(userOrError.error.toString())
        ) as Response;
      }

      const user: UserEntity = userOrError.getValue();

      await this.userRepository.save(user);

      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err)) as Response;
    }
  }
}
