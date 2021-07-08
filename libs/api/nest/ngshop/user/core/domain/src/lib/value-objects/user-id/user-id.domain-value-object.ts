import { Entity, Result, UniqueEntityID } from '@nwc/api/nest/shared/common';

export class UserId extends Entity<any> {
  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get value(): UniqueEntityID {
    return this._id;
  }

  public static create(id?: UniqueEntityID): Result<UserId> {
    return Result.ok<UserId>(new UserId(id));
  }
}
