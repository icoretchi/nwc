import { UserAggregate } from '@nwc/api/nest/ngshop/user/core/domain';

export interface SaveUserPort {
  save(user: UserAggregate): Promise<void>;
}

export const SAVE_USER_PORT = Symbol('SAVE_USER_PORT');
