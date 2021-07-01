import {
  User,
  UserEmail,
  UserName,
} from '@nwc/api/nest/shared/user/core/domain';

export interface UserRepository {
  exists(userEmail: UserEmail): Promise<boolean>;
  getUserByUserId(userId: string): Promise<User>;
  getUserByUserName(userName: UserName | string): Promise<User>;
  save(user: User): Promise<void>;
}
