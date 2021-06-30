import { UniqueEntityID } from '@nwc/api/nest/shared/core';

import { UserEntity } from '../../../../domain/entities/user.entity';
import { UserEmail } from '../../../../domain/value-objects/user-email.value-object';
import { UserName } from '../../../../domain/value-objects/user-name.value-object';
import { UserPassword } from '../../../../domain/value-objects/user-password.value-object';

export class UserMapper {
  public static toDomain(raw: any): UserEntity {
    const userNameOrError = UserName.create({ name: raw.username });
    const userPasswordOrError = UserPassword.create({
      value: raw.password,
      hashed: true,
    });
    const userEmailOrError = UserEmail.create(raw.email);

    const userOrError = UserEntity.create(
      {
        username: userNameOrError.getValue(),
        isAdminUser: raw.is_admin_user,
        isDeleted: raw.is_deleted,
        isEmailVerified: raw.is_email_verified,
        password: userPasswordOrError.getValue(),
        email: userEmailOrError.getValue(),
      },
      new UniqueEntityID(raw.id)
    );

    userOrError.isFailure ? console.log(userOrError.error) : '';

    return userOrError.isSuccess ? userOrError.getValue() : null;
  }

  public static async toPersistence(user: UserEntity): Promise<any> {
    let password: string = null;
    if (!!user.password === true) {
      if (user.password.isAlreadyHashed()) {
        password = user.password.value;
      } else {
        password = await user.password.getHashedValue();
      }
    }

    return {
      base_user_id: user.userId.id.toString(),
      user_email: user.email.value,
      is_email_verified: user.isEmailVerified,
      username: user.username.value,
      user_password: password,
      is_admin_user: user.isAdminUser,
      is_deleted: user.isDeleted,
    };
  }
}
