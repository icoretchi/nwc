import { Result } from '@nwc/api/nest/shared/common';

import { UserName } from '../value-objects';

export class UsernameAlreadyTakenError extends Error {
  public static with(username: UserName): UsernameAlreadyTakenError {
    return new UsernameAlreadyTakenError(
      `Username ${username.value} already taken`
    );
  }
}
