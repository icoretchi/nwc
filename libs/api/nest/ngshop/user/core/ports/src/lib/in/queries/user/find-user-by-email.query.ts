import { IQuery } from '@nestjs/cqrs';
import { UserEmail } from '@nwc/api/nest/ngshop/user/core/domain';
import { SelfValidating } from '@nwc/api/nest/shared/common';
import { IsEmail, IsString, MaxLength } from 'class-validator';

export class FindUserByEmailQuery extends SelfValidating implements IQuery {
  @IsEmail()
  @MaxLength(255)
  @IsString()
  readonly email: UserEmail;

  constructor(email: UserEmail) {
    super();
    this.email = email;
    this.validate();
  }
}
