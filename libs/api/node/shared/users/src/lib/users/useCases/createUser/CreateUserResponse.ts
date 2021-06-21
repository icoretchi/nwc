import { Either, Result } from '@nwc/api/node/shared/core';
import { AppError } from '@nwc/api/node/shared/core';

import { CreateUserErrors } from './CreateUserErrors';

export type CreateUserResponse = Either<
  | CreateUserErrors.EmailAlreadyExistsError
  | CreateUserErrors.UsernameTakenError
  | AppError.UnexpectedError
  | Result<any>,
  Result<void>
>;
