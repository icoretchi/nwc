import {
  ArgumentInvalidException,
  ArgumentOutOfRangeException,
  Result,
} from '@nwc/api/nest/nghrms/shared/common';
import { ValueObject } from '@nwc/api/nest/shared/common';
import { Guard } from '@nwc/api/nest/shared/common';

import { ErrorMessages, PropsNames } from '../../error-messages/messages';

export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 15;

interface UserNameProps {
  value: string;
}

export class UserName extends ValueObject<UserNameProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: UserNameProps) {
    super(props);
  }

  public static create(props: UserNameProps): Result<UserName> {
    return Result.ok<UserName>(new UserName({ value: props.value }));
  }

  public static fromString(username: string): UserName {
    return new UserName({ value: username });
  }

  protected validate(props: UserNameProps): void {
    if (
      !Guard.lengthIsBetween(
        props.value,
        USERNAME_MIN_LENGTH,
        USERNAME_MAX_LENGTH
      )
    ) {
      throw new ArgumentOutOfRangeException(
        `${PropsNames.USERNAME} ${ErrorMessages.OUT_OF_RANGE}`
      );
    }

    if (!Guard.areInvalidCharacters(props.value)) {
      throw new ArgumentInvalidException(ErrorMessages.INVALID_USERNAME);
    }
  }
}
