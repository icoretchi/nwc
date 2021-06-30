import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserRepositoryInterface } from '../../../../application/port/out/user.repository.interface';
import { UserEntity } from '../../../../domain/entities/user.entity';
import { UserEmail } from '../../../../domain/value-objects/user-email.value-object';
import { UserName } from '../../../../domain/value-objects/user-name.value-object';
import { UserMapper } from './user.mapper';
import { User, UserDocument } from './user.schema';

@Injectable()
export default class UsertRepository implements UserRepositoryInterface {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async exists(userEmail: UserEmail): Promise<boolean> {
    const user = await this.userModel.findOne({ email: userEmail.value });
    return !!user === true;
  }

  async getUserByUserName(userName: UserName | string): Promise<UserEntity> {
    const user = await this.userModel.findOne({
      username:
        userName instanceof UserName ? (<UserName>userName).value : userName,
    });
    if (!!user === false) throw new Error('User not found.');
    return UserMapper.toDomain(user);
  }

  async getUserByUserId(userId: string): Promise<UserEntity> {
    const user = await this.userModel.findById(userId);
    if (!!user === false) throw new Error('User not found.');
    return UserMapper.toDomain(user);
  }

  async save(user: UserEntity): Promise<void> {
    const exists = await this.exists(user.email);

    if (!exists) {
      const rawMongooseUser = await UserMapper.toPersistence(user);
      await this.userModel.create(rawMongooseUser);
    }

    return;
  }
}
