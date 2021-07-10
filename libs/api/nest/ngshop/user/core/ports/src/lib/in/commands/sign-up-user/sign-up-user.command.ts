import { ICommand } from '@nestjs/cqrs';
import {
  UserEmail,
  UserName,
  UserPassword,
} from '@nwc/api/nest/ngshop/user/core/domain';
import { SelfValidating } from '@nwc/api/nest/shared/common';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class SignUpUserCommand extends SelfValidating implements ICommand {
  @MinLength(2)
  @MaxLength(50)
  @IsString()
  readonly username: UserName;

  @IsEmail()
  @MaxLength(255)
  @IsString()
  readonly email: UserEmail;

  @MinLength(6)
  @MaxLength(50)
  @IsString()
  readonly password: UserPassword;

  constructor(username: UserName, email: UserEmail, password: UserPassword) {
    super();
    this.username = username;
    this.email = email;
    this.password = password;
    this.validate();
  }
}
