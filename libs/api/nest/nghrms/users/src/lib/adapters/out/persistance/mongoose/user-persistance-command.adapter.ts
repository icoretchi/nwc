import { Injectable } from '@nestjs/common';

import { CreateUserPort, SaveUserPort } from '../../../../application';
import { UserAggregate } from '../../../../domain';
import { UserMapper } from './mappers';
import { UserRepository } from './repositories';

@Injectable()
export class UserPersistenceCommandAdapter
  implements SaveUserPort, CreateUserPort {
  constructor(
    private readonly userMapper: UserMapper,
    private readonly userRepository: UserRepository
  ) {}

  async save(user: UserAggregate): Promise<void> {
    return await this.userRepository.save(
      this.userMapper.mapToPersistence(user)
    );
  }

  async create(user: UserAggregate): Promise<UserAggregate> {
    return this.userMapper.mapToDomain(
      await this.userRepository.create(this.userMapper.mapToPersistence(user))
    );
  }
}
