import { IDomainEvent } from '@nwc/api/node/shared/core';
import { UniqueEntityID } from '@nwc/api/node/shared/core';

import { User } from '../user';

export class UserLoggedIn implements IDomainEvent {
  public dateTimeOccurred: Date;
  public user: User;

  constructor(user: User) {
    this.dateTimeOccurred = new Date();
    this.user = user;
  }

  public getAggregateId(): UniqueEntityID {
    return this.user.id;
  }
}
