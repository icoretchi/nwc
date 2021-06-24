import { UniqueEntityID } from '../base-classes/unique-entity-id.base';

export interface IDomainEvent {
  dateTimeOccurred: Date;
  getAggregateId(): UniqueEntityID;
}
