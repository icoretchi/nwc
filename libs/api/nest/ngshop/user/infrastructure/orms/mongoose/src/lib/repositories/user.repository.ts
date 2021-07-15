import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserDocument, UserEntity } from '../entities';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserDocument>
  ) {}

  async find(query: any): Promise<UserEntity[] | null> {
    return await this.userModel.find({ query }).exec();
  }

  async findOne(query: any): Promise<UserEntity | null> {
    return await this.userModel.findOne({ query }).exec();
  }

  public async exists(query: any): Promise<boolean> {
    return await this.userModel.exists(query);
  }

  async create(data: any): Promise<UserEntity> {
    return await this.userModel.create(data);
  }

  async save(data: any): Promise<void> {
    const user = new this.userModel(data);
    await user.save();
  }
}
