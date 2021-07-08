import { UserName } from '../value-objects';

export class UsernameNotFoundError extends Error {
  public static with(username: UserName): UsernameNotFoundError {
    return new UsernameNotFoundError(`Username ${username.value} not found`);
  }
}
