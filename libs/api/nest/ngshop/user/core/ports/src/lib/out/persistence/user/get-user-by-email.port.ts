import {
  UserAggregate,
  UserEmail,
} from '@nwc/api/nest/ngshop/user/core/domain';

export interface GetUserByEmailPort {
  getUserByEmail(email: UserEmail): Promise<UserAggregate>;
}

export const GET_USER_BY_EMAIL_PORT = Symbol('GET_USER_BY_EMAIL_PORT');
