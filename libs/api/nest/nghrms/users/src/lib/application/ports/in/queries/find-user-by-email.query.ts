import { IQuery } from '@nestjs/cqrs';
import { IsEmail, IsString, MaxLength } from 'class-validator';

import { UserEmail } from '../../../../domain';

export class FindUserByEmailQuery implements IQuery {
  @IsEmail()
  @MaxLength(255)
  @IsString()
  readonly email: UserEmail;

  constructor(email: UserEmail) {
    this.email = email;
  }
}
