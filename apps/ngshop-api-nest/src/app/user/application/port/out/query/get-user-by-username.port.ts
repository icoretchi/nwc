import { Option } from 'fp-ts/Option';

import { User } from '../../../../domain/model/user.domain-model';

export interface GetUserByUsernamePort {
  getByUsername(username: string): Promise<Option<User>>;
}

export const GET_USER_BY_USERNAME_PORT = Symbol('GET_USER_BY_USERNAME_PORT');
