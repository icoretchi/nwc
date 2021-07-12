import { ICommand } from '@nestjs/cqrs';
import {
  UserEmail,
  UserId,
  UserName,
  UserPassword,
} from '@nwc/api/nest/ngshop/user/core/domain';
import { SelfValidating } from '@nwc/api/nest/shared/common';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserCommand extends SelfValidating implements ICommand {
  @MinLength(2)
  @MaxLength(50)
  @IsString()
  readonly userId: UserId;

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

  constructor(
    userId: UserId,
    username: UserName,
    email: UserEmail,
    password: UserPassword
  ) {
    super();
    this.userId = userId;
    this.username = username;
    this.email = email;
    this.password = password;
    this.validate();
  }
}
