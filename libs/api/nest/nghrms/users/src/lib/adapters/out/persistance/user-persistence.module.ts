import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserPersistenceCommandAdapter } from './mongoose';
import { UserPersistenceQueryAdapter } from './mongoose';
import { UserEntity, UserSchema } from './mongoose/entities';
import { UserMapper } from './mongoose/mappers';
import { UserRepository } from './mongoose/repositories';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
  ],
  providers: [
    UserRepository,
    UserPersistenceQueryAdapter,
    UserPersistenceCommandAdapter,
    UserMapper,
  ],
  exports: [
    UserPersistenceQueryAdapter,
    UserPersistenceCommandAdapter,
    MongooseModule,
  ],
})
export class UserMongooseModule {}
