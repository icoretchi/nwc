import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserAggregate } from '@nwc/api/nest/ngshop/user/core/domain';
import {
  FindUserByEmailQuery,
  GET_USER_BY_EMAIL_PORT,
  GetUserByEmailPort,
} from '@nwc/api/nest/ngshop/user/core/ports';
import {
  AppError,
  Either,
  Result,
  left,
  right,
} from '@nwc/api/nest/shared/common';

import { GetUserByEmailErrors } from './get-user-by-email.errors';

type Response = Either<AppError.UnexpectedError, Result<UserAggregate>>;

@QueryHandler(FindUserByEmailQuery)
export class FindUserByEmailQueryHandler
  implements IQueryHandler<FindUserByEmailQuery> {
  constructor(
    @Inject(GET_USER_BY_EMAIL_PORT)
    private readonly users: GetUserByEmailPort
  ) {}

  async execute(query: FindUserByEmailQuery): Promise<Response> {
    const user = await this.users.getUserByEmail(query.email);
    const userFound = !!user === true;

    if (!userFound) {
      return left(
        new GetUserByEmailErrors.UserNotFoundError(query.email.value)
      ) as Response;
    }

    return right(Result.ok<UserAggregate>(user));
  }
  catch(err) {
    return left(new AppError.UnexpectedError(err));
  }
}
