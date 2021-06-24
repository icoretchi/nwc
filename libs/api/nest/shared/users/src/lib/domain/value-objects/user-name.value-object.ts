import { Result } from '@nwc/api/nest/shared/core';
import { ValueObject } from '@nwc/api/nest/shared/core';
import { Guard } from '@nwc/api/nest/shared/core';

interface UserNameProps {
  name: string;
}

export class UserName extends ValueObject<UserNameProps> {
  public static maxLength = 15;
  public static minLength = 2;

  get value(): string {
    return this.props.name;
  }

  private constructor(props: UserNameProps) {
    super(props);
  }

  public static create(props: UserNameProps): Result<UserName> {
    const usernameResult = Guard.againstNullOrUndefined(props.name, 'username');
    if (!usernameResult.succeeded) {
      return Result.fail<UserName>(usernameResult.message);
    }

    const minLengthResult = Guard.againstAtLeast(this.minLength, props.name);
    if (!minLengthResult.succeeded) {
      return Result.fail<UserName>(minLengthResult.message);
    }

    const maxLengthResult = Guard.againstAtMost(this.maxLength, props.name);
    if (!maxLengthResult.succeeded) {
      return Result.fail<UserName>(minLengthResult.message);
    }

    return Result.ok<UserName>(new UserName(props));
  }
}
