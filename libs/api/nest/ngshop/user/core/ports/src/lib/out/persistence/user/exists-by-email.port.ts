import { UserEmail } from '@nwc/api/nest/ngshop/user/core/domain';

export interface ExistsByEmailPort {
  existsByEmail(email: UserEmail): Promise<boolean>;
}

export const EXISTS_BY_EMAIL_PORT = Symbol('EXISTS_BY_EMAIL_PORT');
