import { AggregateRoot, Result } from '@nwc/api/nest/nghrms/shared/common';

import { UserEmail, UserPassword } from '../../value-objects';

interface UserAggregateProps {
  email: UserEmail;
  password: UserPassword;
}

export class UserAggregate extends AggregateRoot<UserAggregateProps> {
  get email(): UserEmail {
    return this.props.email;
  }

  get password(): UserPassword {
    return this.props.password;
  }

  constructor(props: UserAggregateProps) {
    super(props);
  }

  public static create(props: UserAggregateProps): Result<UserAggregate> {
    const user = new UserAggregate(props);
    return Result.ok<UserAggregate>(user);
  }
}
