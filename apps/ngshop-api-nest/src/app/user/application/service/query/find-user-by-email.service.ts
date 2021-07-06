import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators/core';
import { Option } from 'fp-ts/Option';

import { User } from '../../../domain/model/user.domain-model';
import { FindUserByEmailUseCase } from '../../port/in/query/find-user-by-email-use.case';
import {
  GET_USER_BY_EMAIL_PORT,
  GetUserByEmailPort,
} from '../../port/out/query/get-user-by-email.port';

@Injectable()
export class FindUserByEmailService implements FindUserByEmailUseCase {
  constructor(
    @Inject(GET_USER_BY_EMAIL_PORT)
    private readonly users: GetUserByEmailPort
  ) {}

  findByEmail(email: string): Promise<Option<User>> {
    return this.users.getByEmail(email);
  }
}
