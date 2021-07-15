import { Result } from '@nwc/api/nest/nghrms/shared/common';

import { UserEmail } from '../value-objects';

export class EmailAlreadyExistsError extends Result<Error> {
  constructor(email: string) {
    super(false, {
      message: `The email ${email} associated for this account already exists`,
    } as Error);
  }

  public static with(email: UserEmail): EmailAlreadyExistsError {
    return new EmailAlreadyExistsError(email.value);
  }
}
