import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserPersistenceCommandAdapter } from './adapters';
import { UserPersistenceQueryAdapter } from './adapters';
import { UserEntity, UserSchema } from './entities';
import { UserRepository } from './repositories';

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
export class UserMongooseModule {}
