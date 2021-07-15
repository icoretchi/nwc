import {
  Either,
  Result,
  UnexpectedError,
} from '@nwc/api/nest/nghrms/shared/common';

import { UserAggregate } from '../../../../domain';
import { EmailAlreadyExistsError } from '../../errors';

export type CreateUserResponse = Either<
  EmailAlreadyExistsError | UnexpectedError | Result<any>,
  Result<UserAggregate>
>;
