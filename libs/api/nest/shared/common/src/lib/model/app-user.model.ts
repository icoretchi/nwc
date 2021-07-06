export abstract class AppUser {
  protected constructor(readonly email: string, readonly id: number) {}

  abstract get isAuthenticated(): boolean;
}

export class AuthenticatedUser extends AppUser {
  constructor(email: string, id: number) {
    super(email, id);
  }

  get isAuthenticated(): boolean {
    return true;
  }
}

export class AnonymousUser extends AppUser {
  constructor() {
    super('', null as number);
  }

  get isAuthenticated(): boolean {
    return false;
  }
}
