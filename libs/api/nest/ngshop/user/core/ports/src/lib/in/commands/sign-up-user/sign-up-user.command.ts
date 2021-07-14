import { ICommand } from '@nestjs/cqrs';
import {
  UserEmail,
  UserName,
  UserPassword,
} from '@nwc/api/nest/ngshop/user/core/domain';
export class SignUpUserCommand implements ICommand {
  readonly username: UserName;
  readonly email: UserEmail;
  readonly password: UserPassword;

  constructor(username: UserName, email: UserEmail, password: UserPassword) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}
