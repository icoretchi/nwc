import { DomainEvent } from '@nwc/api/nest/shared/core';
import { ID } from '@nwc/api/nest/shared/core';

import { Address } from '../value-objects/address.value-object';
import { Email } from '../value-objects/email.value-object';

export class UserCreatedDomainEvent extends DomainEvent {
  constructor(
    public readonly aggregateId: ID,
    public readonly email: Email,
    public readonly address: Address
  ) {
    super();
  }
}
