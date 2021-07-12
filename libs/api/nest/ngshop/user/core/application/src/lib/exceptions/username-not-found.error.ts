import { UserName } from '@nwc/api/nest/ngshop/user/core/domain';
import { Result } from '@nwc/api/nest/shared/common';

export class UsernameNotFoundError extends Result<Error> {
  constructor(username: string) {
    super(false, {
      message: `Username ${username} not found`,
    } as Error);
  }

  public static with(username: UserName): UsernameNotFoundError {
    return new UsernameNotFoundError(username.value);
  }
}
