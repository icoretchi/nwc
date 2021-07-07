import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators/core';
import { Option } from 'fp-ts/Option';

import { User } from '../../../domain/model/user.domain-model';
import { FindUserByNameUseCase } from '../../port/in/query/find-user-by-name-use.case';
import {
  GET_USER_BY_NAME_PORT,
  GetUserByNamePort,
} from '../../port/out/query/get-user-by-name.port';

@Injectable()
export class FindUserByNameService implements FindUserByNameUseCase {
  constructor(
    @Inject(GET_USER_BY_NAME_PORT)
    private readonly users: GetUserByNamePort
  ) {}

  findByUsername(name: string): Promise<Option<User>> {
    return this.users.getByName(name);
  }
}
