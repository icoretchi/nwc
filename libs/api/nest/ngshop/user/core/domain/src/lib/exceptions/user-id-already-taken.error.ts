import { Result } from '@nwc/api/nest/shared/common';

import { UserId } from '../value-objects';

export class UserIdAlreadyTakenError extends Result<Error> {
  constructor(userId: string) {
    super(false, {
      message: `User id ${userId} already take`,
    } as Error);
  }

  public static with(userId: UserId): UserIdAlreadyTakenError {
    return new UserIdAlreadyTakenError(userId.value.toString());
  }
}
