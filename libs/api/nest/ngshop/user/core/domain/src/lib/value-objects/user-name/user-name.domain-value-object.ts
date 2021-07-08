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

  public static fromString(name: string): Result<UserName> {
    const usernameResult = Guard.againstNullOrUndefined(name, 'name');
    if (!usernameResult.succeeded) {
      return Result.fail<UserName>(usernameResult.message);
    }

    if (!/^[a-zA-Z0-9ñÑ]+$/.test(name)) {
      throw new Error('Invalid username characters');
    }

    return Result.ok<UserName>(new UserName({ value: name }));
  }

  public static create(name: string): Result<UserName> {
    const usernameResult = Guard.againstNullOrUndefined(name, 'name');
    if (!usernameResult.succeeded) {
      return Result.fail<UserName>(usernameResult.message);
    }

    const minLengthResult = Guard.againstAtLeast(this.minLength, name);
    if (!minLengthResult.succeeded) {
      return Result.fail<UserName>(minLengthResult.message);
    }

    const maxLengthResult = Guard.againstAtMost(this.maxLength, name);
    if (!maxLengthResult.succeeded) {
      return Result.fail<UserName>(minLengthResult.message);
    }

    return Result.ok<UserName>(new UserName({ value: name }));
  }
}
