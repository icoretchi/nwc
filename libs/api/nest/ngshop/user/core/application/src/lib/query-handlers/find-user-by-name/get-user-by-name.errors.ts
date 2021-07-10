import { Result, UseCaseError } from '@nwc/api/nest/shared/common';

export namespace GetUserByNameErrors {
  export class UserNotFoundError extends Result<UseCaseError> {
    constructor(username: string) {
      super(false, {
        message: `No user with the username ${username} was found`,
      } as UseCaseError);
    }
  }
}
