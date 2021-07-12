import { Result } from '@nwc/api/nest/shared/common';

export class UnexpectedError extends Result<Error> {
  constructor(err: any) {
    super(false, {
      message: `An unexpected error occurred.`,
      stack: err,
    } as Error);
  }

  public static with(err: any): UnexpectedError {
    return new UnexpectedError(err);
  }
}
