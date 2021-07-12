import { UserAggregate } from '@nwc/api/nest/ngshop/user/core/domain';
import { Either, Result, UnexpectedError } from '@nwc/api/nest/shared/common';

import { UserNotFoundByEmailError } from '../../exceptions';

export type FindUserByEmailResponse = Either<
  UnexpectedError | UserNotFoundByEmailError,
  Result<UserAggregate>
>;
