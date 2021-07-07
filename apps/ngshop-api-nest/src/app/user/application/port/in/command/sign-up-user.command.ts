import { SelfValidating } from '@nwc/api/nest/shared/common';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class SignUpUserCommand extends SelfValidating {
  @MinLength(2)
  @MaxLength(50)
  @IsString()
  readonly name: string;

  @IsEmail()
  @MaxLength(255)
  @IsString()
  readonly email: string;

  @MinLength(6)
  @MaxLength(50)
  @IsString()
  readonly password: string;

  constructor(name: string, email: string, password: string) {
    super();
    this.name = name;
    this.email = email;
    this.password = password;
    this.validate();
  }
}
