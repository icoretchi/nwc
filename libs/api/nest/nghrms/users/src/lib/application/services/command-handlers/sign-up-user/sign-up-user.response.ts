import {
  Either,
  Result,
  UnexpectedError,
} from '@nwc/api/nest/nghrms/shared/common';

import { UserAggregate } from '../../../../domain';
import { EmailAlreadyExistsError } from '../../errors';

export type SignUpUserResponse = Either<
  EmailAlreadyExistsError | UnexpectedError | Result<any>,
  Result<{ user: UserAggregate; token: string }>
>;
