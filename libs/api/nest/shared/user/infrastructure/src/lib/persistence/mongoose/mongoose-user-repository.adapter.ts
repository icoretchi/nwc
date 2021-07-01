import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  User,
  UserEmail,
  UserName,
} from '@nwc/api/nest/shared/user/core/domain';
import { UserRepository } from '@nwc/api/nest/shared/user/core/domain-services';
import { Model } from 'mongoose';

import { MongooseUserMapper } from './mongoose-user.mapper';
import { MongooseUser, MongooseUserDocument } from './mongoose-user.schema';

@Injectable()
export default class MongooseUsertRepositoryAdapter implements UserRepository {
  constructor(
    @InjectModel(MongooseUser.name)
    private userModel: Model<MongooseUserDocument>
  ) {}

  async exists(userEmail: UserEmail): Promise<boolean> {
    const user = await this.userModel.findOne({ email: userEmail.value });
    return !!user === true;
  }

  async getUserByUserName(userName: UserName | string): Promise<User> {
    const user = await this.userModel.findOne({
      username:
        userName instanceof UserName ? (<UserName>userName).value : userName,
    });
    if (!!user === false) {
      throw new Error('User not found.');
    }
    return MongooseUserMapper.toDomain(user);
  }

  async getUserByUserId(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!!user === false) {
      throw new Error('User not found.');
    }
    return MongooseUserMapper.toDomain(user);
  }

  async save(user: User): Promise<void> {
    const exists = await this.exists(user.email);

    if (!exists) {
      const userEntity = await MongooseUserMapper.toPersistence(user);
      await this.userModel.create(userEntity);
    }

    return;
  }
}
