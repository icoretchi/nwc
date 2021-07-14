import {
  UserAggregate,
  UserEmail,
  UserName,
  UserPassword,
} from '@nwc/api/nest/ngshop/user/core/domain';
import { UniqueEntityID } from '@nwc/api/nest/shared/common';

import { UserEntity } from '../entities';

export class UserMapper {
  // toDto (user: UserAggregate): UserDTO {
  //   return {
  //     username: user.username.value,
  //     isEmailVerified: user.isEmailVerified,
  //     isAdminUser: user.isAdminUser,
  //     isDeleted: user.isDeleted
  //   }
  // }
  mapToDomain(user: UserEntity): UserAggregate {
    const userMapped = UserAggregate.create(
      {
        email: UserEmail.fromString(user.email),
        name: UserName.fromString(user.name),
        password: UserPassword.fromString(user.passwordHash),
      },
      new UniqueEntityID(user.id)
    );
    return userMapped.getResult();
  }

  mapToPersistence(user: UserAggregate): UserEntity {
    return {
      id: user.id.toString(),
      name: user.name.value,
      email: user.email.value,
      passwordHash: user.password.value,
    };
  }
}
