import { UserId } from '@nwc/api/nest/ngshop/user/core/domain';
import { Result } from '@nwc/api/nest/shared/common';

export class UserIdAlreadyTakenError extends Result<Error> {
  constructor(userId: string) {
    super(false, {
      message: `User id ${userId} already taken`,
    } as Error);
  }

  public static with(userId: UserId): UserIdAlreadyTakenError {
    return new UserIdAlreadyTakenError(userId.value.toString());
  }
}
