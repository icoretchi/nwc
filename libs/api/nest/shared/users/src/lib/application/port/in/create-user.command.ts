import { Result, ValueObject } from '@nwc/api/nest/shared/core';

import { UserEmail } from '../../../domain/value-objects/user-email.value-object';
import { UserName } from '../../../domain/value-objects/user-name.value-object';
import { UserPassword } from '../../../domain/value-objects/user-password.value-object';

export interface CreateUserDto {
  email: string;
  username: string;
  password: string;
}

export interface CreateUserProps {
  email: UserEmail;
  username: UserName;
  password: UserPassword;
}

export class CreateUserCommand extends ValueObject<CreateUserProps> {
  get email(): UserEmail {
    return this.props.email;
  }

  get username(): UserName {
    return this.props.username;
  }

  get password(): UserPassword {
    return this.props.password;
  }

  private constructor(props: CreateUserProps) {
    super(props);
  }

  public static create(dto: CreateUserDto): Result<CreateUserCommand> {
    const usernameOrError = UserName.create({ name: dto.username });
    const emailOrError = UserEmail.create(dto.email);
    const passwordOrError = UserPassword.create({ value: dto.password });

    const result = Result.combine([
      emailOrError,
      passwordOrError,
      usernameOrError,
    ]);

    if (result.isFailure) {
      return Result.fail<CreateUserCommand>(result.error);
    }

    const email: UserEmail = emailOrError.getValue();
    const password: UserPassword = passwordOrError.getValue();
    const username: UserName = usernameOrError.getValue();

    const command = new CreateUserCommand({ email, username, password });

    return Result.ok<CreateUserCommand>(command);
  }
}
