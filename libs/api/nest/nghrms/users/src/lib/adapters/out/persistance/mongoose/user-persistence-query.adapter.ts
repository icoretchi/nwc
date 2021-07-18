import { Inject, Injectable } from '@nestjs/common';

import { ExistsByEmailPort, GetUserByEmailPort } from '../../../../application';
import { UserAggregate, UserEmail } from '../../../../domain';
import { UserEntity } from './entities';
import { UserMapper } from './mappers';
import { UserRepository } from './repositories';

@Injectable()
export class UserPersistenceQueryAdapter
  implements ExistsByEmailPort, GetUserByEmailPort {
  constructor(
    @Inject(UserMapper) private readonly userMapper: UserMapper,
    private readonly userRepository: UserRepository
  ) {}

  existsByEmail(email: UserEmail): Promise<boolean> {
    return this.userRepository.exists({ email: email.value });
  }

  async getUserByEmail(email: UserEmail): Promise<UserAggregate> {
    const user = (await this.userRepository.findOne(email.value)) as UserEntity;
    if (!user) {
      return null;
    }

    return this.userMapper.mapToDomain(user);
  }
}
