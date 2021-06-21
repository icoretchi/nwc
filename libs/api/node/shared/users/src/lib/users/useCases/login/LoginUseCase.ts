import { AppError } from '@nwc/api/node/shared/core';
import { Either, Result, left, right } from '@nwc/api/node/shared/core';
import { UseCase } from '@nwc/api/node/shared/core';

import { JWTToken, RefreshToken } from '../../domain/jwt';
import { User } from '../../domain/user';
import { UserName } from '../../domain/userName';
import { UserPassword } from '../../domain/userPassword';
import { IUserRepo } from '../../repos/userRepo';
import { IAuthService } from '../../services/authService';
import { LoginDTO, LoginDTOResponse } from './LoginDTO';
import { LoginUseCaseErrors } from './LoginErrors';

type Response = Either<
  | LoginUseCaseErrors.PasswordDoesntMatchError
  | LoginUseCaseErrors.UserNameDoesntExistError
  | AppError.UnexpectedError,
  Result<LoginDTOResponse>
>;

export class LoginUserUseCase implements UseCase<LoginDTO, Promise<Response>> {
  private userRepo: IUserRepo;
  private authService: IAuthService;

  constructor(userRepo: IUserRepo, authService: IAuthService) {
    this.userRepo = userRepo;
    this.authService = authService;
  }

  public async execute(request: LoginDTO): Promise<Response> {
    let user: User;
    let userName: UserName;
    let password: UserPassword;

    try {
      const usernameOrError = UserName.create({ name: request.username });
      const passwordOrError = UserPassword.create({ value: request.password });
      const payloadResult = Result.combine([usernameOrError, passwordOrError]);

      if (payloadResult.isFailure) {
        return left(Result.fail<any>(payloadResult.error));
      }

      userName = usernameOrError.getValue();
      password = passwordOrError.getValue();

      user = await this.userRepo.getUserByUserName(userName);
      const userFound = !!user;

      if (!userFound) {
        return left(new LoginUseCaseErrors.UserNameDoesntExistError());
      }

      const passwordValid = await user.password.comparePassword(password.value);

      if (!passwordValid) {
        return left(new LoginUseCaseErrors.PasswordDoesntMatchError());
      }

      const accessToken: JWTToken = this.authService.signJWT({
        username: user.username.value,
        email: user.email.value,
        isEmailVerified: user.isEmailVerified,
        userId: user.userId.id.toString(),
        adminUser: user.isAdminUser,
      });

      const refreshToken: RefreshToken = this.authService.createRefreshToken();

      user.setAccessToken(accessToken, refreshToken);

      await this.authService.saveAuthenticatedUser(user);

      return right(
        Result.ok<LoginDTOResponse>({
          accessToken,
          refreshToken,
        })
      );
    } catch (err) {
      return left(new AppError.UnexpectedError(err.toString()));
    }
  }
}
