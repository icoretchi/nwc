import {
  Either,
  Result,
  UnexpectedError,
} from '@nwc/api/nest/nghrms/shared/common';

import { UserAggregate } from '../../../../domain';
import { UserNotFoundByEmailError } from '../../errors';

export type FindUserByEmailResponse = Either<
  UnexpectedError | UserNotFoundByEmailError,
  Result<UserAggregate>
>;
