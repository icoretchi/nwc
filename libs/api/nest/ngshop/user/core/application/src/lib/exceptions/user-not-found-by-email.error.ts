import { UserEmail } from '@nwc/api/nest/ngshop/user/core/domain';
import { Result } from '@nwc/api/nest/shared/common';

export class UserNotFoundByEmailError extends Result<Error> {
  constructor(email: string) {
    super(false, {
      message: `No user with the email ${email} was found`,
    } as Error);
  }

  public static with(email: UserEmail): UserNotFoundByEmailError {
    return new UserNotFoundByEmailError(email.value);
  }
}
