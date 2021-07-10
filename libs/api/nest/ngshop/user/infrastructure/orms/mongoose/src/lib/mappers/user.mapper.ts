import {
  UserAggregate,
  UserEmail,
  UserName,
  UserPassword,
} from '@nwc/api/nest/ngshop/user/core/domain';
import { UniqueEntityID } from '@nwc/api/nest/shared/common';

import { UserEntity } from '../entities';

export class UserMapper {
  mapToDomain(user: UserEntity): UserAggregate {
    return UserAggregate.create(
      {
        email: UserEmail.fromString(user.email).getResult(),
        name: UserName.fromString(user.name).getResult(),
        password: UserPassword.fromString(user.passwordHash).getResult(),
      },
      new UniqueEntityID(user.id)
    ).getResult();
  }

  async mapToPersistence(user: UserAggregate): Promise<UserEntity> {
    let password: string = null;
    if (!!user.password === true) {
      if (user.password.isAlreadyEncrypted) {
        password = user.password.value;
      } else {
        password = await user.password.getHashedValue();
      }
    }
    return {
      id: user.id.toString(),
      name: user.name.value,
      email: user.email.value,
      passwordHash: password,
    };
  }
}
