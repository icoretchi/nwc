import { UserAggregate, UserName } from '@nwc/api/nest/ngshop/user/core/domain';

export interface GetUserByNamePort {
  getUserByName(username: UserName): Promise<UserAggregate>;
}

export const GET_USER_BY_NAME_PORT = Symbol('GET_USER_BY_NAME_PORT');
