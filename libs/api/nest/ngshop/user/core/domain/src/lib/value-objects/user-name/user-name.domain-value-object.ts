import { Result } from '@nwc/api/nest/shared/common';
import { ValueObject } from '@nwc/api/nest/shared/common';
import { Guard } from '@nwc/api/nest/shared/common';

interface UserNameProps {
  value: string;
}

export class UserName extends ValueObject<UserNameProps> {
  public static maxLength = 15;
  public static minLength = 2;

  get value(): string {
    return this.props.value;
  }

  private constructor(props: UserNameProps) {
    super(props);
  }

  public static create(props: UserNameProps): Result<UserName> {
    const usernameResult = Guard.againstNullOrUndefined(props.value, 'name');
    if (!usernameResult.succeeded) {
      return Result.fail<UserName>(usernameResult.message);
    }

    const minLengthResult = Guard.againstAtLeast(this.minLength, props.value);
    if (!minLengthResult.succeeded) {
      return Result.fail<UserName>(minLengthResult.message);
    }

    const maxLengthResult = Guard.againstAtMost(this.maxLength, props.value);
    if (!maxLengthResult.succeeded) {
      return Result.fail<UserName>(minLengthResult.message);
    }

    const invalidCharachtersResult = Guard.againstInvalidCharacters(
      props.value,
      'name'
    );
    if (!invalidCharachtersResult.succeeded) {
      return Result.fail<UserName>(invalidCharachtersResult.message);
    }

    return Result.ok<UserName>(new UserName({ value: props.value }));
  }

  public static fromString(username: string): UserName {
    const usernameResult = Guard.againstNullOrUndefined(username, 'name');
    if (!usernameResult.succeeded) {
      throw new Error(usernameResult.message);
    }

    const minLengthResult = Guard.againstAtLeast(this.minLength, username);
    if (!minLengthResult.succeeded) {
      throw new Error(minLengthResult.message);
    }

    const maxLengthResult = Guard.againstAtMost(this.maxLength, username);
    if (!maxLengthResult.succeeded) {
      throw new Error(maxLengthResult.message);
    }

    const invalidCharachtersResult = Guard.againstInvalidCharacters(
      username,
      'name'
    );
    if (!invalidCharachtersResult.succeeded) {
      throw new Error(invalidCharachtersResult.message);
    }

    return new UserName({ value: username });
  }
}
