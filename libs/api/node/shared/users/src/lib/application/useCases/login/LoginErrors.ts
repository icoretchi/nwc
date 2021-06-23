import { Result } from '@nwc/api/node/shared/core';
import { UseCaseError } from '@nwc/api/node/shared/core';

export namespace LoginUseCaseErrors {
  export class UserNameDoesntExistError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Username or password incorrect.`,
      } as UseCaseError);
    }
  }

  export class PasswordDoesntMatchError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Password doesnt match error.`,
      } as UseCaseError);
    }
  }
}
