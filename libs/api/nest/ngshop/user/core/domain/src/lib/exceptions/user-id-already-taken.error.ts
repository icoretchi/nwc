import { UserId } from '../value-objects';

export class UserIdAlreadyTakenError extends Error {
  public static with(userId: UserId): UserIdAlreadyTakenError {
    return new UserIdAlreadyTakenError(`User id ${userId.value} already taken`);
  }
}
