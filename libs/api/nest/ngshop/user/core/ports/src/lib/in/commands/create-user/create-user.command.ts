import { ICommand } from '@nestjs/cqrs';
import {
  UserEmail,
  UserId,
  UserName,
  UserPassword,
} from '@nwc/api/nest/ngshop/user/core/domain';

export class CreateUserCommand implements ICommand {
  readonly userId: UserId;
  readonly username: UserName;
  readonly email: UserEmail;
  readonly password: UserPassword;

  constructor(
    userId: UserId,
    username: UserName,
    email: UserEmail,
    password: UserPassword
  ) {
    this.userId = userId;
    this.username = username;
    this.email = email;
    this.password = password;
  }
}
