import { UserEmail } from '@nwc/api/nest/ngshop/user/core/domain';
import { Result } from '@nwc/api/nest/shared/common';

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
