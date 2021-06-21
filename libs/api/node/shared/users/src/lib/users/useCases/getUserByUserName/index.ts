import { userRepo } from '../../repos';
import { GetUserByUserName } from './GetUserByUserName';
import { GetUserByUserNameController } from './GetUserByUserNameController';

const getUserByUserName = new GetUserByUserName(userRepo);

const getUserByUserNameController = new GetUserByUserNameController(
  getUserByUserName
);

export { getUserByUserName, getUserByUserNameController };
