import { Result } from '@nwc/api/node/shared/core';
import { UseCaseError } from '@nwc/api/node/shared/core';

export namespace GetUserByUserNameErrors {
  export class UserNotFoundError extends Result<UseCaseError> {
    constructor(username: string) {
      super(false, {
        message: `No user with the username ${username} was found`,
      } as UseCaseError);
    }
  }
}
