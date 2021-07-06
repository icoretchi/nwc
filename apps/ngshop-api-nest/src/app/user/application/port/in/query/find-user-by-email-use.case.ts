import { Option } from 'fp-ts/Option';

import { User } from '../../../../domain/model/user.domain-model';

export interface FindUserByEmailUseCase {
  findByEmail(email: string): Promise<Option<User>>;
}

export const FIND_USER_BY_EMAIL_USE_CASE = Symbol(
  'FIND_USER_BY_EMAIL_USE_CASE'
);
