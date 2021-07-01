import { IDomainEvent } from '@nwc/api/nest/shared/common';
import { UniqueEntityID } from '@nwc/api/nest/shared/common';

import { User } from '../entities/user.entity';

export class UserDeleted implements IDomainEvent {
  public dateTimeOccurred: Date;
  public user: User;

  constructor(user: User) {
    this.dateTimeOccurred = new Date();
    this.user = user;
  }

  getAggregateId(): UniqueEntityID {
    return this.user.id;
  }
}
