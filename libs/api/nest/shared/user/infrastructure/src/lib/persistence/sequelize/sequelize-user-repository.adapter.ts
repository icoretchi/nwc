import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  User,
  UserEmail,
  UserName,
} from '@nwc/api/nest/shared/user/core/domain';
import { UserRepository } from '@nwc/api/nest/shared/user/core/domain-services';

import { SequelizeUserMapper } from './sequelize-user.mapper';
import { SequelizeUserModel } from './sequelize-user.model';

@Injectable()
export class SequelizeUserRepositoryAdapter implements UserRepository {
  constructor(
    @InjectModel(SequelizeUserModel)
    private readonly userModel: typeof SequelizeUserModel
  ) {}

  async exists(userEmail: UserEmail): Promise<boolean> {
    const user = await this.userModel.findOne({
      where: {
        user_email: userEmail.value,
      },
    });
    return !!user === true;
  }

  async getUserByUserName(userName: UserName | string): Promise<User> {
    const user = await this.userModel.findOne({
      where: {
        user_name:
          userName instanceof UserName ? (<UserName>userName).value : userName,
      },
    });
    if (!!user === false) throw new Error('User not found.');
    return SequelizeUserMapper.toDomain(user);
  }

  async getUserByUserId(userId: string): Promise<User> {
    const user = await this.userModel.findOne({
      where: {
        id: userId,
      },
    });
    if (!!user === false) throw new Error('User not found.');
    return SequelizeUserMapper.toDomain(user);
  }

  async save(user: User): Promise<void> {
    const exists = await this.exists(user.email);

    if (!exists) {
      const rawSequelizeUser = await SequelizeUserMapper.toPersistence(user);
      await SequelizeUserModel.create(rawSequelizeUser);
    }

    return;
  }
}
