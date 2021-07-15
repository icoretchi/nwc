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
  CreateUserCommand,
  CreateUserPort,
  EXISTS_BY_EMAIL_PORT,
  ExistsByEmailPort,
} from '../../../ports';
import { EmailAlreadyExistsError } from '../../errors';
import { CreateUserResponse } from './create-user.response';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(CREATE_USER_PORT)
    private readonly userCreated: CreateUserPort,
    @Inject(EXISTS_BY_EMAIL_PORT)
    private readonly existsUserByEmail: ExistsByEmailPort
  ) {}

  async execute(command: CreateUserCommand): Promise<CreateUserResponse> {
    const { email, password } = command;
    try {
      if (await this.existsUserByEmail.existsByEmail(email)) {
        return left(EmailAlreadyExistsError.with(email)) as CreateUserResponse;
      }

      const userOrError: Result<UserAggregate> = UserAggregate.create({
        email,
        password,
      });

      if (userOrError.isFailure) {
        return left(
          Result.fail<UserAggregate>(userOrError.error.toString())
        ) as CreateUserResponse;
      }

      const user: UserAggregate = userOrError.getValue();

      const createdUser = await this.userCreated.create(user);

      return right(Result.ok<UserAggregate>(createdUser)) as CreateUserResponse;
    } catch (err) {
      return left(UnexpectedError.with(err)) as CreateUserResponse;
    }
  }
}
