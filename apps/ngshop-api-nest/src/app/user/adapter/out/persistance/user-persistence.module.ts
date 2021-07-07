import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserEntity, UserSchema } from './database/user.entity';
import { UserRepository } from './database/user.repository';
import { UserPersistenceCommandAdapter } from './user-persistance-command.adapter';
import { UserPersistenceQueryAdapter } from './user-persistence-query.adapter';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
  ],
  providers: [
    UserRepository,
    UserPersistenceQueryAdapter,
    UserPersistenceCommandAdapter,
  ],
  exports: [
    UserPersistenceQueryAdapter,
    UserPersistenceCommandAdapter,
    MongooseModule,
  ],
})
export class UserPersistenceModule {}
