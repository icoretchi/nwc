import {
  AggregateRoot,
  Guard,
  Result,
  UniqueEntityID,
} from '@nwc/api/nest/shared/core';

import { UserCreated } from '../events/user-created.domain-event';
import { UserDeleted } from '../events/user-deleted.domain-event';
import { UserLoggedIn } from '../events/user-logged-in.domain-event';
import { JWTToken, RefreshToken } from '../types/jwt.type';
import { UserEmail } from '../value-objects/user-email.value-object';
import { UserId } from '../value-objects/user-id.value-object';
import { UserName } from '../value-objects/user-name.value-object';
import { UserPassword } from '../value-objects/user-password.value-object';

export interface UserProps {
  email: UserEmail;
  username: UserName;
  password: UserPassword;
  isEmailVerified?: boolean;
  isAdminUser?: boolean;
  accessToken?: JWTToken;
  refreshToken?: RefreshToken;
  isDeleted?: boolean;
  lastLogin?: Date;
}
export class UserEntity extends AggregateRoot<UserProps> {
  get userId(): UserId {
    return UserId.create(this.id).getValue();
  }

  get email(): UserEmail {
    return this.props.email;
  }

  get username(): UserName {
    return this.props.username;
  }

  get password(): UserPassword {
    return this.props.password;
  }

  get accessToken(): string {
    return this.props.accessToken;
  }

  get isDeleted(): boolean {
    return this.props.isDeleted;
  }

  get isEmailVerified(): boolean {
    return this.props.isEmailVerified;
  }

  get isAdminUser(): boolean {
    return this.props.isAdminUser;
  }

  get lastLogin(): Date {
    return this.props.lastLogin;
  }

  get refreshToken(): RefreshToken {
    return this.props.refreshToken;
  }

  public isLoggedIn(): boolean {
    return !!this.props.accessToken && !!this.props.refreshToken;
  }

  public setAccessToken(token: JWTToken, refreshToken: RefreshToken): void {
    this.addDomainEvent(new UserLoggedIn(this));
    this.props.accessToken = token;
    this.props.refreshToken = refreshToken;
    this.props.lastLogin = new Date();
  }

  public delete(): void {
    if (!this.props.isDeleted) {
      this.addDomainEvent(new UserDeleted(this));
      this.props.isDeleted = true;
    }
  }

  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: UserProps,
    id?: UniqueEntityID
  ): Result<UserEntity> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.username, argumentName: 'username' },
      { argument: props.email, argumentName: 'email' },
    ]);

    if (!guardResult.succeeded) {
      return Result.fail<UserEntity>(guardResult.message);
    }

    const isNewUser = !!id === false;
    const user = new UserEntity(
      {
        ...props,
        isDeleted: props.isDeleted ? props.isDeleted : false,
        isEmailVerified: props.isEmailVerified ? props.isEmailVerified : false,
        isAdminUser: props.isAdminUser ? props.isAdminUser : false,
      },
      id
    );

    if (isNewUser) {
      user.addDomainEvent(new UserCreated(user));
    }

    return Result.ok<UserEntity>(user);
  }
}
