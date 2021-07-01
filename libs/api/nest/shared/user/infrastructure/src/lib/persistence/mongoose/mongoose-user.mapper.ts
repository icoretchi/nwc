import { UniqueEntityID } from '@nwc/api/nest/shared/common';
import {
  User,
  UserEmail,
  UserName,
  UserPassword,
} from '@nwc/api/nest/shared/user/core/domain';

export class MongooseUserMapper {
  public static toDomain(raw: any): User {
    const userNameOrError = UserName.create({ name: raw.username });
    const userPasswordOrError = UserPassword.create({
      value: raw.password,
      hashed: true,
    });
    const userEmailOrError = UserEmail.create(raw.email);

    const userOrError = User.create(
      {
        email: userEmailOrError.getValue(),
        username: userNameOrError.getValue(),
        password: userPasswordOrError.getValue(),
        isAdminUser: raw.isAdminUser,
        isDeleted: raw.isDeleted,
        isEmailVerified: raw.isEmailVerified,
      },
      new UniqueEntityID(raw.id)
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
      id: user.userId.id.toString(),
      email: user.email.value,
      username: user.username.value,
      password: password,
      isEmailVerified: user.isEmailVerified,
      isAdminUser: user.isAdminUser,
      isDeleted: user.isDeleted,
    };
  }
}
