import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRepository } from './database/user.repository';
import { UserPersistenceCommandAdapter } from './user-persistance-command.adapter';
import { UserPersistenceQueryAdapter } from './user-persistence-query.adapter';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [UserPersistenceQueryAdapter, UserPersistenceCommandAdapter],
  exports: [
    UserPersistenceQueryAdapter,
    UserPersistenceCommandAdapter,
    TypeOrmModule,
  ],
})
export class UserPersistenceModule {}
