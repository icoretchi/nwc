import { UserEntity } from '../../../domain/entities/user.entity';
import { UserEmail } from '../../../domain/value-objects/user-email.value-object';
import { UserName } from '../../../domain/value-objects/user-name.value-object';

export interface UserRepositoryInterface {
  exists(userEmail: UserEmail): Promise<boolean>;
  getUserByUserId(userId: string): Promise<UserEntity>;
  getUserByUserName(userName: UserName | string): Promise<UserEntity>;
  save(user: UserEntity): Promise<void>;
}
