import { UserId } from '@nwc/api/nest/ngshop/user/core/domain';
import { Result } from '@nwc/api/nest/shared/common';

export class UserIdNotFoundError extends Result<Error> {
  constructor(userId: string) {
    super(false, {
      message: `User id ${userId} not found`,
    } as Error);
  }

  public static with(userId: UserId): UserIdNotFoundError {
    return new UserIdNotFoundError(userId.value.toString());
  }
}
