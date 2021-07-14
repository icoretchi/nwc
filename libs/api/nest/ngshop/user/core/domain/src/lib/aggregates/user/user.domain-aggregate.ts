import {
  AggregateRoot,
  Guard,
  Result,
  UniqueEntityID,
} from '@nwc/api/nest/shared/common';

import { UserEmail, UserId, UserName, UserPassword } from '../../value-objects';

interface UserAggregateProps {
  email: UserEmail;
  name: UserName;
  password: UserPassword;
}

export class UserAggregate extends AggregateRoot<UserAggregateProps> {
  get userId(): UserId {
    return UserId.create(this._id).getValue();
  }

  get email(): UserEmail {
    return this.props.email;
  }

  get name(): UserName {
    return this.props.name;
  }

  get password(): UserPassword {
    return this.props.password;
  }

  private constructor(props: UserAggregateProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: UserAggregateProps,
    id?: UniqueEntityID
  ): Result<UserAggregate> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.name, argumentName: 'name' },
      { argument: props.email, argumentName: 'email' },
    ]);
    if (!guardResult.succeeded) {
      return Result.fail<UserAggregate>(guardResult.message);
    }

    const user = new UserAggregate({ ...props }, id);
    return Result.ok<UserAggregate>(user);
  }
}
