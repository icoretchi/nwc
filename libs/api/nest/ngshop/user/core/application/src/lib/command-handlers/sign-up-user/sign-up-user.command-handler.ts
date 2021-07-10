import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  CreateUserCommand,
  EXISTS_BY_EMAIL_PORT,
  EXISTS_BY_EMAIL_REPOSITORY_INTERFACE,
  ExistsByEmailPort,
  ExistsByEmailRepositoryInterface,
  GET_USER_BY_EMAIL_REPOSITORY_INTERFACE,
  GetUserByEmailRepositoryInterface,
  SAVE_USER_PORT,
  SaveUserPort,
  SignUpUserCommand,
  TOKEN_PROVIDER_PORT,
  TokenProviderPort,
} from '@nwc/api/nest/ngshop/user/core/ports';

import {
  Password,
  Role,
  USERS,
  User,
  UserId,
  Username,
  Users,
} from '../../domain';
import {
  UserIdAlreadyTakenError,
  UsernameAlreadyTakenError,
} from '../../domain/exception/';

type Response = Either<AppError.UnexpectedError, Result<User>>;

@CommandHandler(SignUpUserCommand)
export class SignUpUserCommandHandler
  implements ICommandHandler<SignUpUserCommand> {
  constructor(
    @Inject(SAVE_USER_PORT)
    private readonly userSaver: SaveUserPort,
    @Inject(EXISTS_BY_EMAIL_PORT)
    private readonly existsUser: ExistsByEmailPort,
    @Inject(TOKEN_PROVIDER_PORT)
    private readonly tokenProvider: TokenProviderPort
  ) {}

  async execute(
    command: CreateUserCommand
  ): Promise<E.Either<SignUpUserErrors, { user: User; token: string }>> {
    if (await this.existsUser.existsByEmail(command.email)) {
      return E.left(SignUpUserErrors.EmailTaken);
    }
    const user = new User(null, command.name, command.email, command.password);

    const savedUser = await this.userSaver.save(await user.hashPassword());

    return E.right({
      user: savedUser,
      token: this.tokenProvider.signToken(savedUser.id, savedUser.email),
    });
  }
}
