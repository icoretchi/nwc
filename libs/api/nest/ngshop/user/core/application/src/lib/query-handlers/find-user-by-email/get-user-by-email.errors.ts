import { Result, UseCaseError } from '@nwc/api/nest/shared/common';

export namespace GetUserByEmailErrors {
  export class UserNotFoundError extends Result<UseCaseError> {
    constructor(email: string) {
      super(false, {
        message: `No user with the email ${email} was found`,
      } as UseCaseError);
    }
  }
}
