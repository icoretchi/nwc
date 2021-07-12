import { UserName } from '@nwc/api/nest/ngshop/user/core/domain';
import { Result } from '@nwc/api/nest/shared/common';

export class UsernameAlreadyTakenError extends Result<Error> {
  constructor(username: string) {
    super(false, {
      message: `Username ${username} already taken`,
    } as Error);
  }

  public static with(username: UserName): UsernameAlreadyTakenError {
    return new UsernameAlreadyTakenError(username.value);
  }
}
