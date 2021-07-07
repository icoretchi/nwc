import { Injectable } from '@nestjs/common';
import * as O from 'fp-ts/Option';

import { ExistsByEmailPort } from '../../../application/port/out/query/exists-by-email.port';
import { GetUserByEmailPort } from '../../../application/port/out/query/get-user-by-email.port';
import { GetUserByNamePort } from '../../../application/port/out/query/get-user-by-name.port';
import { User } from '../../../domain/model/user.domain-model';
import { UserDocument } from './database/user.entity';
import { UserRepository } from './database/user.repository';

@Injectable()
export class UserPersistenceQueryAdapter
  implements ExistsByEmailPort, GetUserByNamePort, GetUserByEmailPort {
  constructor(private readonly userRepository: UserRepository) {}

  existsByEmail(email: string): Promise<boolean> {
    return this.userRepository.existsByEmail(email);
  }

  async getByName(username: string): Promise<O.Option<User>> {
    const user = (await this.userRepository.getUserByName(
      username
    )) as UserDocument;
    if (!user) {
      return O.none;
    }
    return O.some(new User(user.id, user.name, user.email, user.passwordHash));
  }

  async getByEmail(email: string): Promise<O.Option<User>> {
    const user = (await this.userRepository.getUserByEmail(
      email
    )) as UserDocument;
    if (!user) {
      return O.none;
    }
    return O.some(new User(user.id, user.name, user.email, user.passwordHash));
  }
}
