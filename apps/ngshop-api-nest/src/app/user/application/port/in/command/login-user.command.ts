import { SelfValidating } from '@nwc/api/nest/shared/common';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUserCommand extends SelfValidating {
  @MaxLength(50)
  @IsString()
  @IsEmail()
  readonly email: string;

  @MinLength(6)
  @MaxLength(50)
  @IsString()
  readonly password: string;

  constructor(email: string, password: string) {
    super();
    this.email = email;
    this.password = password;
    this.validate();
  }
}
