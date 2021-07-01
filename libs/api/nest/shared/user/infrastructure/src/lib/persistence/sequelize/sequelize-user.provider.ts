import { SequelizeUserModel } from './sequelize-user.model';

export const userProvider = {
  provide: 'UserRepository',
  useValue: SequelizeUserModel,
};
