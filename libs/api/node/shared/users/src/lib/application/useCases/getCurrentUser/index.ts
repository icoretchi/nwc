import { getUserByUserName } from '../getUserByUserName';
import { GetCurrentUserController } from './GetCurrentUserController';

const getCurrentUserController = new GetCurrentUserController(
  getUserByUserName
);

export { getCurrentUserController };
