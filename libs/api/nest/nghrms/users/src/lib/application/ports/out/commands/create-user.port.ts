import { UserAggregate } from '../../../../domain';

export interface CreateUserPort {
  create(user: UserAggregate): Promise<UserAggregate>;
}

export const CREATE_USER_PORT = Symbol('CREATE_USER_PORT');
