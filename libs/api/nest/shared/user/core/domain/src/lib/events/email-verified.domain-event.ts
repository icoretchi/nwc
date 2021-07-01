import { IDomainEvent } from '@nwc/api/nest/shared/common';
import { UniqueEntityID } from '@nwc/api/nest/shared/common';
import { UserInfo } from 'node:os';

import { User } from '../entities/user.entity';

export class EmailVerified implements IDomainEvent {
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
