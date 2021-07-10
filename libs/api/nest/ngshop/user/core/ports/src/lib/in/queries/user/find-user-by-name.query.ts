import { IQuery } from '@nestjs/cqrs';
import { UserName } from '@nwc/api/nest/ngshop/user/core/domain';
import { SelfValidating } from '@nwc/api/nest/shared/common';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class FindUserByNameQuery extends SelfValidating implements IQuery {
  @MinLength(2)
  @MaxLength(50)
  @IsString()
  readonly username: UserName;

  constructor(username: UserName) {
    super();
    this.username = username;
    this.validate();
  }
}
