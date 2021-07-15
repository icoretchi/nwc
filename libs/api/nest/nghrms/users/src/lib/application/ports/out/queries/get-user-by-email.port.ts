import { UserAggregate, UserEmail } from '../../../../domain';

export interface GetUserByEmailPort {
  getUserByEmail(email: UserEmail): Promise<UserAggregate>;
}

export const GET_USER_BY_EMAIL_PORT = Symbol('GET_USER_BY_EMAIL_PORT');
