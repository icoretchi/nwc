import { UniqueEntityID } from '@nwc/api/nest/shared/common';
import {
  User,
  UserEmail,
  UserName,
  UserPassword,
} from '@nwc/api/nest/shared/user/core/domain';

export class SequelizeUserMapper {
  public static toDomain(raw: any): User {
    const userNameOrError = UserName.create({ name: raw.username });
    const userPasswordOrError = UserPassword.create({
      value: raw.user_password,
      hashed: true,
    });
    const userEmailOrError = UserEmail.create(raw.user_email);

    const userOrError = User.create(
      {
        username: userNameOrError.getValue(),
        isAdminUser: raw.is_admin_user,
        isDeleted: raw.is_deleted,
        isEmailVerified: raw.is_email_verified,
        password: userPasswordOrError.getValue(),
        email: userEmailOrError.getValue(),
      },
      new UniqueEntityID(raw.user_id)
    );

    userOrError.isFailure ? console.log(userOrError.error) : '';

    return userOrError.isSuccess ? userOrError.getValue() : null;
  }

  public static async toPersistence(user: User): Promise<any> {
    let password: string = null;
    if (!!user.password === true) {
      if (user.password.isAlreadyHashed()) {
        password = user.password.value;
      } else {
        password = await user.password.getHashedValue();
      }
    }

    return {
      user_id: user.userId.id.toString(),
      user_email: user.email.value,
      is_email_verified: user.isEmailVerified,
      user_name: user.username.value,
      user_password: password,
      is_admin_user: user.isAdminUser,
      is_deleted: user.isDeleted,
    };
  }
}
