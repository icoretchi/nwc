import { Option } from 'fp-ts/Option';

import { User } from '../../../../domain/model/user.domain-model';

export interface GetUserByEmailPort {
  getByEmail(email: string): Promise<Option<User>>;
}

export const GET_USER_BY_EMAIL_PORT = Symbol('GET_USER_BY_EMAIL_PORT');
