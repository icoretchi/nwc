import { UserAggregate, UserEmail, UserPassword } from '../../../../../domain';
import { UserEntity } from '../entities';

export class UserMapper {
  mapToDomain(user: UserEntity): UserAggregate {
    const userMapped = UserAggregate.create({
      email: UserEmail.fromString(user.email),
      password: UserPassword.fromString(user.passwordHash),
    });
    return userMapped.getResult();
  }

  mapToPersistence(user: UserAggregate): UserEntity {
    return {
      id: user.id.toString(),
      email: user.email.value,
      passwordHash: user.password.value,
    };
  }
}
