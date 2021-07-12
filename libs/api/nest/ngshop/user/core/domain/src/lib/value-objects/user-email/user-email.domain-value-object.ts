import { Result, ValueObject } from '@nwc/api/nest/shared/common';
import isEmail from 'validator/lib/isEmail';

import { ErrorMessages } from '../../error-messages/messages';

export interface UserEmailProps {
  value: string;
}

export class UserEmail extends ValueObject<UserEmailProps> {
  private constructor(props: UserEmailProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(props: UserEmailProps): Result<UserEmail> {
    const isValidEmail = isEmail(props.value);

    if (!isValidEmail) {
      return Result.fail<UserEmail>(ErrorMessages.INVALID_EMAIL);
    }

    return Result.ok<UserEmail>(
      new UserEmail({
        value: props.value.toLocaleLowerCase(),
      })
    );
  }

  public static fromString(email: string): UserEmail {
    const isValidEmail = isEmail(email);

    if (!isValidEmail) {
      throw Error(ErrorMessages.INVALID_EMAIL);
    }

    return new UserEmail({
      value: email.toLocaleLowerCase(),
    });
  }
}
