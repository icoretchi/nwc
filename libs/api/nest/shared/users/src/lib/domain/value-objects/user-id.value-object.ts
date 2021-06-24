import { UniqueEntityID } from '@nwc/api/nest/shared/core';
import { Result } from '@nwc/api/nest/shared/core';
import { Entity } from '@nwc/api/nest/shared/core';

export class UserId extends Entity<any> {
  get id(): UniqueEntityID {
    return this._id;
  }

  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }

  public static create(id?: UniqueEntityID): Result<UserId> {
    return Result.ok<UserId>(new UserId(id));
  }
}
