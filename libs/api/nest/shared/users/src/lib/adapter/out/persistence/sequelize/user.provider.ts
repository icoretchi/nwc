import { UserModel } from './user.model';

export const userProvider = {
  provide: 'UserRepository',
  useValue: UserModel,
};
