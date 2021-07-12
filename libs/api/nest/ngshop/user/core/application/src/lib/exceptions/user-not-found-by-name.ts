import { UserName } from '@nwc/api/nest/ngshop/user/core/domain';
import { Result } from '@nwc/api/nest/shared/common';

export class UserNotFoundByNameError extends Result<Error> {
  constructor(username: string) {
    super(false, {
      message: `No user with the name ${username} was found`,
    } as Error);
  }

  public static with(username: UserName): UserNotFoundByNameError {
    return new UserNotFoundByNameError(username.value);
  }
}
