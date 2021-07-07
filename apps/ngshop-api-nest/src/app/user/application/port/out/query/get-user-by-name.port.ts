import { Option } from 'fp-ts/Option';

import { User } from '../../../../domain/model/user.domain-model';

export interface GetUserByNamePort {
  getByName(name: string): Promise<Option<User>>;
}

export const GET_USER_BY_NAME_PORT = Symbol('GET_USER_BY_NAME_PORT');
