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
  left,
  right,
} from '@nwc/api/nest/shared/common';

import { GetUserByNameErrors } from './get-user-by-name.errors';

type Response = Either<AppError.UnexpectedError, Result<UserAggregate>>;

@QueryHandler(FindUserByNameQuery)
export class FindUserByNameQueryHandler
  implements IQueryHandler<FindUserByNameQuery> {
  constructor(
    @Inject(GET_USER_BY_NAME_PORT)
    private readonly users: GetUserByNamePort
  ) {}

  async execute(query: FindUserByNameQuery): Promise<Response> {
    const user = await this.users.getUserByName(query.username);
    const userFound = !!user === true;

    if (!userFound) {
      return left(
        new GetUserByNameErrors.UserNotFoundError(query.username.value)
      ) as Response;
    }

    return right(Result.ok<UserAggregate>(user));
  }
  catch(err) {
    return left(new AppError.UnexpectedError(err));
  }
}
