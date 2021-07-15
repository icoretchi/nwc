import { Result } from '@nwc/api/nest/nghrms/shared/common';

import { UserEmail } from '../../../domain';

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
