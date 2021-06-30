import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { UserRepositoryInterface } from '../../../../application/port/out/user.repository.interface';
import { UserEntity } from '../../../../domain/entities/user.entity';
import { UserEmail } from '../../../../domain/value-objects/user-email.value-object';
import { UserName } from '../../../../domain/value-objects/user-name.value-object';
import { UserMapper } from './user.mapper';
import { UserModel } from './user.model';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(
    @InjectModel(UserModel) private readonly userModel: typeof UserModel
  ) {}

  async exists(userEmail: UserEmail): Promise<boolean> {
    const user = await this.userModel.findOne({
      where: {
        email: userEmail.value,
      },
    });
    return !!user === true;
  }

  async getUserByUserName(userName: UserName | string): Promise<UserEntity> {
    const user = await this.userModel.findOne({
      where: {
        username:
          userName instanceof UserName ? (<UserName>userName).value : userName,
      },
    });
    if (!!user === false) throw new Error('User not found.');
    return UserMapper.toDomain(user);
  }

  async getUserByUserId(userId: string): Promise<UserEntity> {
    const user = await this.userModel.findOne({
      where: {
        id: userId,
      },
    });
    if (!!user === false) throw new Error('User not found.');
    return UserMapper.toDomain(user);
  }

  async save(user: UserEntity): Promise<void> {
    const exists = await this.exists(user.email);

    if (!exists) {
      const rawSequelizeUser = await UserMapper.toPersistence(user);
      await UserModel.create(rawSequelizeUser);
    }

    return;
  }
}
