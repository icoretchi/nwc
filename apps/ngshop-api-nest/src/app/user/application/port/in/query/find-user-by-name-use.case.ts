import { Option } from 'fp-ts/Option';

import { User } from '../../../../domain/model/user.domain-model';

export interface FindUserByNameUseCase {
  findByUsername(name: string): Promise<Option<User>>;
}

export const FIND_USER_BY_NAME_USE_CASE = Symbol('FIND_USER_BY_NAME_USE_CASE');
