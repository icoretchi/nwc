import { IDomainEvent } from '@nwc/api/nest/shared/core';
import { UniqueEntityID } from '@nwc/api/nest/shared/core';

import { UserEntity } from '../entities/user.entity';

export class UserDeleted implements IDomainEvent {
  public dateTimeOccurred: Date;
  public user: UserEntity;

  constructor(user: UserEntity) {
    this.dateTimeOccurred = new Date();
    this.user = user;
  }

  getAggregateId(): UniqueEntityID {
    return this.user.id;
  }
}
