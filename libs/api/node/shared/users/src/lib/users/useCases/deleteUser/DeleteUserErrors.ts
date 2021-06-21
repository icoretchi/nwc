import { Result } from '@nwc/api/node/shared/core';
import { UseCaseError } from '@nwc/api/node/shared/core';

export namespace DeleteUserErrors {
  export class UserNotFoundError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `User not found`,
      } as UseCaseError);
    }
  }
}
