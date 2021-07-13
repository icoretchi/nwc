import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserPersistenceCommandAdapter } from './adapters';
import { UserPersistenceQueryAdapter } from './adapters';
import { UserEntity, UserSchema } from './entities';
import { UserMapper } from './mappers';
import { UserRepository } from './repositories';

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
