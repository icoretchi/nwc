import { Inject, Injectable } from '@nestjs/common';
import {
  UserAggregate,
  UserEmail,
  UserName,
} from '@nwc/api/nest/ngshop/user/core/domain';
import {
  ExistsByEmailPort,
  GetUserByEmailPort,
  GetUserByNamePort,
} from '@nwc/api/nest/ngshop/user/core/ports';

import { UserEntity } from '../entities';
import { UserMapper } from '../mappers';
import { UserRepository } from '../repositories';

@Injectable()
export class UserPersistenceQueryAdapter
  implements ExistsByEmailPort, GetUserByNamePort, GetUserByEmailPort {
  constructor(
    @Inject(UserMapper) private readonly userMapper: UserMapper,
    private readonly userRepository: UserRepository
  ) {}

  existsByEmail(email: UserEmail): Promise<boolean> {
    return this.userRepository.exists(email.value);
  }

  async getUserByName(username: UserName): Promise<UserAggregate> {
    const user = (await this.userRepository.findOne(
      username.value
    )) as UserEntity;
    if (!user) {
      return null;
    }

    return this.userMapper.mapToDomain(user);
  }

  async getUserByEmail(email: UserEmail): Promise<UserAggregate> {
    const user = (await this.userRepository.findOne(email.value)) as UserEntity;
    if (!user) {
      return null;
    }

    return this.userMapper.mapToDomain(user);
  }
}
