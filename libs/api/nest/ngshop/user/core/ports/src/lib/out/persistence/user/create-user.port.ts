import { UserAggregate } from '@nwc/api/nest/ngshop/user/core/domain';

export interface CreateUserPort {
  create(user: UserAggregate): Promise<UserAggregate>;
}

export const CREATE_USER_PORT = Symbol('CREATE_USER_PORT');
