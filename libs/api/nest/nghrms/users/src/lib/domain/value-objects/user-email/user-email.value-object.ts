import {
  ArgumentInvalidException,
  Result,
  ValueObject,
} from '@nwc/api/nest/nghrms/shared/common';
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

  protected validate(props: UserEmailProps): void {
    const isValidEmail = isEmail(props.value);
    if (!isValidEmail) {
      throw new ArgumentInvalidException(ErrorMessages.INVALID_EMAIL);
    }
  }

  public static create(props: UserEmailProps): Result<UserEmail> {
    return Result.ok<UserEmail>(
      new UserEmail({
        value: props.value.toLocaleLowerCase(),
      })
    );
  }

  public static fromString(email: string): UserEmail {
    return new UserEmail({
      value: email.toLocaleLowerCase(),
    });
  }
}
