import { userRepo } from '../../repos';
import { authService } from '../../services';
import { LogoutController } from './LogoutController';
import { LogoutUseCase } from './LogoutUseCase';

const logoutUseCase = new LogoutUseCase(userRepo, authService);
const logoutController = new LogoutController(logoutUseCase);

export { logoutUseCase, logoutController };
