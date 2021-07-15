import { ICommand } from '@nestjs/cqrs';

import { UserEmail, UserPassword } from '../../../../domain';

export class SignUpUserCommand implements ICommand {
  readonly email: UserEmail;
  readonly password: UserPassword;

  constructor(email: UserEmail, password: UserPassword) {
    this.email = email;
    this.password = password;
  }
}
