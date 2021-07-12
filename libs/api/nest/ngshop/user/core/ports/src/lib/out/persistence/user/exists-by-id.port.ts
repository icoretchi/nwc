import { UserId } from '@nwc/api/nest/ngshop/user/core/domain';

export interface ExistsByIdPort {
  existsById(userId: UserId): Promise<boolean>;
}

export const EXISTS_BY_ID_PORT = Symbol('EXISTS_BY_ID_PORT');
