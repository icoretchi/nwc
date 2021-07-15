import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Result, left, right } from '@nwc/api/nest/nghrms/shared/common';
import { UnexpectedError } from '@nwc/api/nest/shared/common';

import { UserAggregate } from '../../../../domain';
import {
  FindUserByEmailQuery,
  GET_USER_BY_EMAIL_PORT,
  GetUserByEmailPort,
} from '../../../ports';
import { UserNotFoundByEmailError } from '../../errors';
import { FindUserByEmailResponse } from './find-user-by-email.response';

@QueryHandler(FindUserByEmailQuery)
export class FindUserByEmailQueryHandler
  implements IQueryHandler<FindUserByEmailQuery, FindUserByEmailResponse> {
  constructor(
    @Inject(GET_USER_BY_EMAIL_PORT)
    private readonly users: GetUserByEmailPort
  ) {}

  async execute(query: FindUserByEmailQuery): Promise<FindUserByEmailResponse> {
    try {
      const user = await this.users.getUserByEmail(query.email);
      const userFound = !!user === true;

      if (!userFound) {
        return left(
          UserNotFoundByEmailError.with(query.email)
        ) as FindUserByEmailResponse;
      }

      return right(Result.ok<UserAggregate>(user)) as FindUserByEmailResponse;
    } catch (err) {
      return left(UnexpectedError.with(err)) as FindUserByEmailResponse;
    }
  }
}
