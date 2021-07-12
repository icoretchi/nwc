import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserAggregate } from '@nwc/api/nest/ngshop/user/core/domain';
import {
  FindUserByNameQuery,
  GET_USER_BY_NAME_PORT,
  GetUserByNamePort,
} from '@nwc/api/nest/ngshop/user/core/ports';
import {
  AppError,
  Either,
  Result,
  UnexpectedError,
  left,
  right,
} from '@nwc/api/nest/shared/common';

import { UserNotFoundByNameError } from '../../exceptions/user-not-found-by-name';

type Response = Either<AppError.UnexpectedError, Result<UserAggregate>>;

@QueryHandler(FindUserByNameQuery)
export class FindUserByNameQueryHandler
  implements IQueryHandler<FindUserByNameQuery> {
  constructor(
    @Inject(GET_USER_BY_NAME_PORT)
    private readonly users: GetUserByNamePort
  ) {}

  async execute(query: FindUserByNameQuery): Promise<Response> {
    try {
      const user = await this.users.getUserByName(query.username);
      const userFound = !!user === true;

      if (!userFound) {
        return left(UserNotFoundByNameError.with(query.username)) as Response;
      }

      return right(Result.ok<UserAggregate>(user)) as Response;
    } catch (err) {
      return left(UnexpectedError.with(err)) as Response;
    }
  }
}
