import { AggregateRoot as Aggregate } from '@nestjs/cqrs';
import { mix } from 'ts-mixer';

import { DomainEvent } from './domain-event.base';
import { DomainEvents } from './domain-events';
import { Entity } from './entity.base';

export interface AggregateRoot<EntityProps>
  extends Entity<EntityProps>,
    Aggregate {}
@mix(Aggregate)
export abstract class AggregateRoot<EntityProps> extends Entity<EntityProps> {
  private _domainEvents: DomainEvent[] = [];

  get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }

  protected addEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent);
    DomainEvents.prepareForPublish(this);
  }

  public clearEvents(): void {
    this._domainEvents = [];
  }
}
