import { SelfValidating } from '@nwc/api/nest/shared/common';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class SignUpUserCommand extends SelfValidating {
  @MinLength(2)
  @MaxLength(50)
  @IsString()
  readonly username: string;

  @MinLength(6)
  @MaxLength(50)
  @IsString()
  readonly password: string;

  @IsEmail()
  @MaxLength(255)
  @IsString()
  readonly email: string;

  constructor(username: string, email: string, password: string) {
    super();
    this.username = username;
    this.email = email;
    this.password = password;
    this.validate();
  }
}
