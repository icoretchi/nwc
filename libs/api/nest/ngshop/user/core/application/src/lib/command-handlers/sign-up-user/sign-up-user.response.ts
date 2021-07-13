import { UserAggregate } from '@nwc/api/nest/ngshop/user/core/domain';
import { Either, Result, UnexpectedError } from '@nwc/api/nest/shared/common';

import { EmailAlreadyExistsError } from '../../exceptions';

export type SignUpUserResponse = Either<
  EmailAlreadyExistsError | UnexpectedError | Result<any>,
  Result<{ user: UserAggregate; token: string }>
>;
