import { Injectable } from '@nestjs/common';
import * as O from 'fp-ts/Option';

import { ExistsByUsernameOrEmailPort } from '../../../application/port/out/query/exists-by-username-or-email.port';
import { GetUserByEmailPort } from '../../../application/port/out/query/get-user-by-email.port';
import { GetUserByUsernamePort } from '../../../application/port/out/query/get-user-by-username.port';
import { User } from '../../../domain/model/user.domain-model';
import { UserRepository } from './database/user.repository';

@Injectable()
export class UserPersistenceQueryAdapter
  implements
    ExistsByUsernameOrEmailPort,
    GetUserByUsernamePort,
    GetUserByEmailPort {
  constructor(private readonly userRepository: UserRepository) {}

  existsByUsernameOrEmail(username: string, email: string): Promise<boolean> {
    return this.userRepository.existsByEmailOrUsername(email, username);
  }

  async getByUsername(username: string): Promise<O.Option<User>> {
    const user = await this.userRepository.findOne({ username });
    if (!user) {
      return O.none;
    }
    return O.some(new User(user.id, user.username, user.email, user.password));
  }

  async getByEmail(email: string): Promise<O.Option<User>> {
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      return O.none;
    }
    return O.some(new User(user.id, user.username, user.email, user.password));
  }
}
