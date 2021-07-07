import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from '../../../../domain/model/user.domain-model';
import { UserDocument, UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserEntity.name) private userModel: Model<UserDocument>
  ) {}

  async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.userModel.findOne({ email }).exec();
  }

  async getUserByName(name: string): Promise<UserEntity> {
    return await this.userModel.findOne({ name }).exec();
  }

  public async existsByEmail(email: string): Promise<boolean> {
    return await this.userModel.exists({ email });
  }

  async create(user: User): Promise<UserEntity> {
    return await this.userModel.create(user);
  }

  async save(target: User): Promise<void> {
    const user = new this.userModel(target);
    await user.save();
  }
}
