import { Injectable } from '@nestjs/common';

import { SaveUserPort } from '../../../application/port/out/command/save-user.port';
import { User } from '../../../domain/model/user.domain-model';
import { UserDocument } from './database/user.entity';
import { UserRepository } from './database/user.repository';

@Injectable()
export class UserPersistenceCommandAdapter implements SaveUserPort {
  constructor(private readonly userRepository: UserRepository) {}

  async save(user: User): Promise<User> {
    const created = (await this.userRepository.create(user)) as UserDocument;
    return new User(
      created.id,
      created.name,
      created.email,
      created.passwordHash
    );
  }
}
