import { userRepo } from '../../repos';
import { DeleteUserController } from './DeleteUserController';
import { DeleteUserUseCase } from './DeleteUserUseCase';

const deleteUserUseCase = new DeleteUserUseCase(userRepo);
const deleteUserController = new DeleteUserController(deleteUserUseCase);

export { deleteUserUseCase, deleteUserController };
